"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";

interface RecipeProgressTrackerProps {
  instructions: string[];
  stepTimes: number[]; // Time in minutes for each step
  onStepComplete?: (stepIndex: number) => void;
  onCurrentStepChange?: (stepIndex: number) => void;
  onStepToggle?: (stepIndex: number, isCompleted: boolean) => void;
  onTimerComplete?: (stepIndex: number) => void;
  readingStep?: number; // Step currently being read aloud
  externalCompletedSteps?: boolean[]; // External state for completed steps
}

export interface RecipeProgressTrackerRef {
  startTimer: (stepIndex: number) => void;
  stopTimer: () => void;
  getActiveTimer: () => number | null;
  getTimeRemaining: () => number;
}

const RecipeProgressTracker = forwardRef<
  RecipeProgressTrackerRef,
  RecipeProgressTrackerProps
>(function RecipeProgressTracker(
  {
    instructions,
    stepTimes,
    onStepComplete,
    onCurrentStepChange,
    onStepToggle,
    onTimerComplete,
    readingStep,
    externalCompletedSteps,
  },
  ref
) {
  // Use external state if provided, otherwise internal
  const [internalCompletedSteps, setInternalCompletedSteps] = useState<
    boolean[]
  >(new Array(instructions.length).fill(false));

  const completedSteps = externalCompletedSteps || internalCompletedSteps;

  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [showTimerAlert, setShowTimerAlert] = useState(false);
  const [alertStepIndex, setAlertStepIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate progress
  const progress =
    (completedSteps.filter(Boolean).length / instructions.length) * 100;

  // Get current active step (first uncompleted)
  const currentStep = completedSteps.findIndex((completed) => !completed);
  const activeStep = currentStep === -1 ? instructions.length - 1 : currentStep;

  // Notify parent of current step changes
  useEffect(() => {
    if (onCurrentStepChange) {
      onCurrentStepChange(activeStep);
    }
  }, [activeStep, onCurrentStepChange]);

  // Format time for display
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  // Play notification sound - louder and longer for timer alert
  const playNotification = useCallback((isTimerComplete: boolean = false) => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = isTimerComplete ? 660 : 880;
      oscillator.type = "sine";
      gainNode.gain.value = isTimerComplete ? 0.5 : 0.3;

      oscillator.start();

      if (isTimerComplete) {
        // Play a series of beeps for timer completion
        setTimeout(() => {
          oscillator.frequency.value = 880;
        }, 300);
        setTimeout(() => {
          oscillator.frequency.value = 660;
        }, 600);
        setTimeout(() => {
          oscillator.frequency.value = 880;
        }, 900);
        oscillator.stop(audioContext.currentTime + 1.2);
      } else {
        oscillator.stop(audioContext.currentTime + 0.5);
      }
    } catch {
      // Audio not supported
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (activeTimer !== null && !isPaused && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Timer completed!
            playNotification(true);
            setShowTimerAlert(true);
            setAlertStepIndex(activeTimer);

            // Notify parent
            if (onTimerComplete) {
              onTimerComplete(activeTimer);
            }

            // Auto-hide alert after 10 seconds
            setTimeout(() => setShowTimerAlert(false), 10000);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeTimer, isPaused, timeRemaining, playNotification, onTimerComplete]);

  // Total elapsed time tracker - track time from first step to completion
  useEffect(() => {
    // Start tracking when first step is completed
    const hasStarted = completedSteps.some(Boolean);
    const isComplete = completedSteps.every(Boolean);

    if (hasStarted && !isComplete) {
      elapsedRef.current = setInterval(() => {
        setTotalElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (elapsedRef.current) {
        clearInterval(elapsedRef.current);
      }
    };
  }, [completedSteps]);

  const startTimer = useCallback(
    (stepIndex: number) => {
      setActiveTimer(stepIndex);
      setTimeRemaining(stepTimes[stepIndex] * 60); // Convert to seconds
      setIsPaused(false);
      setShowTimerAlert(false);
    },
    [stepTimes]
  );

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const stopTimer = useCallback(() => {
    setActiveTimer(null);
    setTimeRemaining(0);
    setIsPaused(false);
  }, []);

  const toggleStep = (index: number) => {
    const newValue = !completedSteps[index];

    // Use external callback if provided
    if (onStepToggle) {
      onStepToggle(index, newValue);
    } else {
      // Use internal state
      const newCompleted = [...internalCompletedSteps];
      newCompleted[index] = newValue;
      setInternalCompletedSteps(newCompleted);
    }

    // If completed the active timer step, stop the timer
    if (newValue && activeTimer === index) {
      stopTimer();
    }

    // Notify parent of completion
    if (newValue && onStepComplete) {
      onStepComplete(index);
    }
  };

  const resetAll = () => {
    if (onStepToggle) {
      // Reset via external callback
      instructions.forEach((_, index) => {
        onStepToggle(index, false);
      });
    } else {
      setInternalCompletedSteps(new Array(instructions.length).fill(false));
    }
    setActiveTimer(null);
    setTimeRemaining(0);
    setIsPaused(false);
    setTotalElapsed(0);
    setShowTimerAlert(false);
  };

  // Expose methods to parent via ref
  useImperativeHandle(
    ref,
    () => ({
      startTimer,
      stopTimer,
      getActiveTimer: () => activeTimer,
      getTimeRemaining: () => timeRemaining,
    }),
    [startTimer, stopTimer, activeTimer, timeRemaining]
  );

  return (
    <div className="space-y-6">
      {/* Timer Alert Banner */}
      {showTimerAlert && alertStepIndex !== null && (
        <div
          className="p-4 rounded-2xl animate-pulse flex items-center justify-between"
          style={{
            background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)",
            boxShadow: "0 4px 20px rgba(255, 107, 107, 0.4)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">⏰</span>
            <div>
              <h4 className="text-white font-bold">Timer Complete!</h4>
              <p className="text-white/80 text-sm">
                Step {alertStepIndex + 1} timer has finished
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowTimerAlert(false)}
            className="px-4 py-2 rounded-lg font-medium text-white bg-white/20 hover:bg-white/30 transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Progress Bar */}
      <div
        className="p-6 rounded-2xl"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Cooking Progress
          </h3>
          <div className="flex items-center gap-4">
            <span
              className="text-sm"
              style={{ color: "var(--foreground-secondary)" }}
            >
              Total Time: {formatTime(totalElapsed)}
            </span>
            <button
              onClick={resetAll}
              className="text-sm px-3 py-1 rounded-full transition-colors"
              style={{
                background: "var(--background)",
                color: "var(--foreground-secondary)",
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div
          className="w-full h-3 rounded-full overflow-hidden"
          style={{ background: "var(--background)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, var(--accent) 0%, var(--accent-secondary) 100%)",
            }}
          />
        </div>

        <div className="flex justify-between mt-2">
          <span
            className="text-sm"
            style={{ color: "var(--foreground-secondary)" }}
          >
            {completedSteps.filter(Boolean).length} of {instructions.length}{" "}
            steps
          </span>
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--accent)" }}
          >
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Instructions with Timers */}
      <ol className="space-y-4">
        {instructions.map((instruction, index) => {
          const isCompleted = completedSteps[index];
          const isActive = activeTimer === index;
          const isReading = readingStep === index;
          const stepTime = stepTimes[index] || 5;

          return (
            <li
              key={index}
              className={`p-5 rounded-2xl transition-all duration-300 ${
                isActive ? "ring-2 ring-[var(--accent)]" : ""
              } ${isReading ? "ring-2 ring-blue-500" : ""}`}
              style={{
                background: isCompleted
                  ? "var(--background)"
                  : "var(--card-bg)",
                border: "1px solid var(--card-border)",
                opacity: isCompleted ? 0.7 : 1,
              }}
            >
              <div className="flex gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleStep(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isCompleted ? "scale-110" : ""
                  }`}
                  style={{
                    background: isCompleted
                      ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)"
                      : "transparent",
                    border: isCompleted
                      ? "none"
                      : "2px solid var(--card-border)",
                  }}
                >
                  {isCompleted ? (
                    <span className="text-white text-sm">✓</span>
                  ) : (
                    <span
                      className="text-sm font-bold"
                      style={{ color: "var(--foreground-secondary)" }}
                    >
                      {index + 1}
                    </span>
                  )}
                </button>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    <p
                      className={`leading-relaxed flex-1 ${
                        isCompleted ? "line-through" : ""
                      }`}
                      style={{
                        color: isCompleted
                          ? "var(--foreground-secondary)"
                          : "var(--foreground)",
                      }}
                    >
                      {instruction}
                    </p>
                    {isReading && (
                      <span
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded-full animate-pulse"
                        style={{
                          background: "rgba(59, 130, 246, 0.2)",
                          color: "#3b82f6",
                        }}
                      >
                        🔊 Reading
                      </span>
                    )}
                  </div>

                  {/* Timer Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: "var(--background)",
                        color: "var(--foreground-secondary)",
                      }}
                    >
                      ⏱️ {stepTime} min
                    </span>

                    {!isCompleted && (
                      <>
                        {isActive ? (
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-lg font-mono font-bold ${
                                timeRemaining < 60 ? "animate-pulse" : ""
                              }`}
                              style={{
                                color:
                                  timeRemaining < 60
                                    ? "#ff6b6b"
                                    : "var(--foreground)",
                              }}
                            >
                              {formatTime(timeRemaining)}
                            </span>
                            <button
                              onClick={togglePause}
                              className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                              style={{
                                background: "var(--background)",
                              }}
                            >
                              {isPaused ? "▶️" : "⏸️"}
                            </button>
                            <button
                              onClick={stopTimer}
                              className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                              style={{
                                background: "var(--background)",
                              }}
                            >
                              ⏹️
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startTimer(index)}
                            className="text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:scale-105"
                            style={{
                              background:
                                "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)",
                              color: "white",
                            }}
                          >
                            Start Timer
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Completion Message */}
      {progress === 100 && (
        <div
          className="p-6 rounded-2xl text-center"
          style={{
            background:
              "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)",
          }}
        >
          <span className="text-4xl mb-2 block">🎉</span>
          <h3 className="text-xl font-bold text-white mb-2">
            Recipe Complete!
          </h3>
          <p className="text-white/80">
            Total cooking time: {formatTime(totalElapsed)}
          </p>
        </div>
      )}

      {/* Hidden audio element for notification */}
      <audio ref={audioRef} />
    </div>
  );
});

export default RecipeProgressTracker;
