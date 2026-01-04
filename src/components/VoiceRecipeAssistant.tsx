"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface VoiceRecipeAssistantProps {
  instructions: string[];
  currentStep: number;
  onStepComplete: (stepIndex: number) => void;
  onStepChange: (stepIndex: number) => void;
  onStartTimer: (stepIndex: number) => void;
  onStopTimer: () => void;
  recipeName: string;
  stepTimes: number[];
}

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

// Map spoken number words to digits
const spokenNumberMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
  // Common misheard words
  to: 2,
  too: 2,
  for: 4,
  won: 1,
};

function parseStepNumber(text: string): number | null {
  // Try to find a digit
  const digitMatch = text.match(/(\d+)/);
  if (digitMatch) {
    return parseInt(digitMatch[1]);
  }

  // Try to find spoken number words
  const words = text.toLowerCase().split(/\s+/);
  for (const word of words) {
    if (spokenNumberMap[word] !== undefined) {
      return spokenNumberMap[word];
    }
  }

  return null;
}

export default function VoiceRecipeAssistant({
  instructions,
  currentStep,
  onStepComplete,
  onStepChange,
  onStartTimer,
  onStopTimer,
  recipeName,
  stepTimes,
}: VoiceRecipeAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [lastCommand, setLastCommand] = useState<string>("");
  const [showCommandFeedback, setShowCommandFeedback] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Use refs to track state for callbacks (avoids stale closures)
  const isListeningRef = useRef(false);
  const shouldRestartRef = useRef(false);
  const currentStepRef = useRef(currentStep);
  const instructionsRef = useRef(instructions);
  const stepTimesRef = useRef(stepTimes);

  // Keep refs in sync with props
  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    instructionsRef.current = instructions;
  }, [instructions]);

  useEffect(() => {
    stepTimesRef.current = stepTimes;
  }, [stepTimes]);

  // Check browser support
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSpeechSupported("speechSynthesis" in window);
      setVoiceSupported(
        "SpeechRecognition" in window || "webkitSpeechRecognition" in window
      );
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Speak text using text-to-speech
  const speak = useCallback((text: string) => {
    if (!synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  }, []);

  // Read current step aloud (uses ref for current value)
  const readCurrentStep = useCallback(() => {
    const step = currentStepRef.current;
    const instr = instructionsRef.current;
    if (step < instr.length) {
      const stepText = `Step ${step + 1}: ${instr[step]}`;
      speak(stepText);
    }
  }, [speak]);

  // Stop voice recognition
  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    shouldRestartRef.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  // Process voice commands (uses refs instead of stale closures)
  const processCommand = useCallback(
    (transcript: string) => {
      const command = transcript.toLowerCase().trim();
      const step = currentStepRef.current;
      const instr = instructionsRef.current;
      const times = stepTimesRef.current;

      setShowCommandFeedback(true);
      setTimeout(() => setShowCommandFeedback(false), 2000);

      console.log(`Voice command: "${command}", current step: ${step}`);

      // STOP voice control - check FIRST before any other commands
      if (
        command === "stop" ||
        command === "pause" ||
        command.includes("stop listening") ||
        command.includes("stop voice") ||
        command.includes("quiet") ||
        command.includes("turn off")
      ) {
        if (synthRef.current) {
          synthRef.current.cancel();
        }
        stopListening();
        speak("Voice control stopped.");
        return;
      }

      // Stop timer command (different from stop voice)
      if (command.includes("stop timer") || command.includes("cancel timer")) {
        onStopTimer();
        speak("Timer stopped.");
        return;
      }

      // Start timer command
      if (command.includes("start timer") || command.includes("set timer")) {
        onStartTimer(step);
        const time = times[step] || 5;
        speak(`Timer started for step ${step + 1}. ${time} minutes.`);
        return;
      }

      // Done/Complete/Next commands
      if (
        command.includes("done") ||
        command.includes("complete") ||
        command.includes("next step") ||
        command.includes("next") ||
        command.includes("finished")
      ) {
        if (step < instr.length) {
          console.log(`Completing step ${step}`);
          onStepComplete(step);
          // Auto-read next step after a short delay
          if (step + 1 < instr.length) {
            setTimeout(() => {
              const newStep = currentStepRef.current;
              speak(`Step ${newStep + 1}: ${instr[newStep]}`);
            }, 800);
          } else {
            speak("Congratulations! You've completed the recipe!");
          }
        }
        return;
      }

      // Repeat command
      if (
        command.includes("repeat") ||
        command.includes("again") ||
        command.includes("what")
      ) {
        readCurrentStep();
        return;
      }

      // Read specific step - handles both "step 2" and "step two/to"
      if (command.includes("step") || command.includes("go to")) {
        // Check if it's not a "start timer for step X" command
        if (!command.includes("timer")) {
          const stepNum = parseStepNumber(command);
          if (stepNum !== null && stepNum >= 1 && stepNum <= instr.length) {
            const targetStep = stepNum - 1;
            onStepChange(targetStep);
            speak(`Step ${stepNum}: ${instr[targetStep]}`);
            return;
          }
        }
      }

      // Start command - just "start" to begin listening is already handled by button
      if (command.includes("start cooking") || command.includes("begin")) {
        speak(`Starting ${recipeName}. Step 1: ${instr[0]}`);
        return;
      }

      // Help command
      if (command.includes("help") || command.includes("commands")) {
        speak(
          "Available commands: Say 'done' or 'next' to complete current step. Say 'repeat' to hear it again. Say 'start timer' to start the timer. Say 'step' followed by a number to jump to that step. Say 'stop' to turn off voice control."
        );
        return;
      }
    },
    [
      onStepComplete,
      onStepChange,
      onStartTimer,
      onStopTimer,
      readCurrentStep,
      speak,
      recipeName,
      stopListening,
    ]
  );

  // Create and configure speech recognition
  const createRecognition = useCallback(() => {
    if (!voiceSupported) return null;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true; // Enable interim results for faster feedback
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const last = event.results.length - 1;
      const result = event.results[last];
      const transcript = result[0].transcript;

      // Show what we're hearing in real-time for feedback
      setLastCommand(transcript);

      // Only process final results to avoid duplicate commands
      if (result.isFinal) {
        processCommand(transcript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "aborted" || event.error === "no-speech") {
        return;
      }
      console.error("Speech recognition error:", event.error);
      isListeningRef.current = false;
      shouldRestartRef.current = false;
      setIsListening(false);
    };

    recognition.onend = () => {
      // Only restart if we should still be listening
      if (shouldRestartRef.current && isListeningRef.current) {
        setTimeout(() => {
          if (shouldRestartRef.current && isListeningRef.current) {
            try {
              const newRecognition = createRecognition();
              if (newRecognition) {
                recognitionRef.current = newRecognition;
                newRecognition.start();
              }
            } catch {
              isListeningRef.current = false;
              shouldRestartRef.current = false;
              setIsListening(false);
            }
          }
        }, 100);
      } else {
        setIsListening(false);
      }
    };

    return recognition;
  }, [voiceSupported, processCommand]);

  // Start voice recognition
  const startListening = useCallback(() => {
    if (!voiceSupported) return;

    isListeningRef.current = true;
    shouldRestartRef.current = true;

    const recognition = createRecognition();
    if (recognition) {
      recognitionRef.current = recognition;
      try {
        recognition.start();
        speak("Voice control activated. Say 'help' for available commands.");
      } catch {
        isListeningRef.current = false;
        shouldRestartRef.current = false;
        setIsListening(false);
      }
    }
  }, [voiceSupported, createRecognition, speak]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isListeningRef.current = false;
      shouldRestartRef.current = false;
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  if (!speechSupported && !voiceSupported) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out ${
        isMinimized ? "w-auto" : "w-80"
      } ${isListening ? "voice-float-active" : ""}`}
    >
      {/* Floating Voice Control Panel */}
      <div
        className={`voice-panel rounded-2xl overflow-hidden shadow-2xl ${
          isListening ? "voice-active-border" : ""
        }`}
        style={{
          background: "var(--card-bg)",
          border: isListening
            ? "2px solid rgba(255, 107, 107, 0.5)"
            : "2px solid var(--card-border)",
          backdropFilter: "blur(20px)",
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 relative overflow-hidden"
          style={{
            background: isListening
              ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)"
              : "var(--background-secondary)",
            transition: "background 0.4s ease",
          }}
        >
          {/* Shimmer effect when listening */}
          {isListening && (
            <div className="absolute inset-0 voice-shimmer pointer-events-none" />
          )}

          {!isMinimized && (
            <div className="flex items-center gap-3 relative z-10">
              {/* Animated microphone icon */}
              <div className="relative">
                <span
                  className={`text-xl ${
                    isListening ? "mic-icon-listening" : "mic-icon"
                  }`}
                  style={{ display: "inline-block" }}
                >
                  {isListening ? "🎙️" : "🎤"}
                </span>
                {isListening && (
                  <>
                    <span className="voice-ring" />
                    <span className="voice-ring voice-ring-delayed" />
                  </>
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className="font-semibold text-sm"
                  style={{ color: isListening ? "white" : "var(--foreground)" }}
                >
                  Voice Assistant
                </span>
                {isListening && (
                  <span
                    className="text-xs opacity-90"
                    style={{ color: "white" }}
                  >
                    Listening...
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 relative z-10">
            {/* Sound wave visualizer when listening */}
            {isListening && (
              <div className="sound-wave-container">
                <div className="sound-wave-bar" />
                <div className="sound-wave-bar" />
                <div className="sound-wave-bar" />
                <div className="sound-wave-bar" />
                <div className="sound-wave-bar" />
              </div>
            )}

            {/* Minimize/Expand button */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className={`w-9 h-9 rounded-full flex items-center justify-center minimize-btn ${
                !isMinimized ? "minimize-btn-expanded" : ""
              }`}
              style={{
                background: isListening
                  ? "rgba(255,255,255,0.25)"
                  : "rgba(128,128,128,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                transition: "all 0.3s ease",
              }}
            >
              <span
                className="text-lg font-light"
                style={{ color: isListening ? "white" : "var(--foreground)" }}
              >
                {isMinimized ? "+" : "−"}
              </span>
            </button>
          </div>

          {/* Minimized state - show listening indicator */}
          {isMinimized && isListening && (
            <div className="flex items-center gap-2 mr-2">
              <div className="sound-wave-container">
                <div className="sound-wave-bar" />
                <div className="sound-wave-bar" />
                <div className="sound-wave-bar" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {!isMinimized && (
          <div className="voice-panel-content p-4 space-y-4">
            {/* Current Step Display */}
            <div
              className="p-4 rounded-xl text-sm relative overflow-hidden"
              style={{
                background: "var(--background)",
                color: "var(--foreground)",
                border: "1px solid var(--card-border)",
              }}
            >
              <div
                className="text-xs mb-2 flex items-center gap-2"
                style={{ color: "var(--foreground-secondary)" }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #ff6b6b, #4ecdc4)",
                  }}
                />
                Current Step ({currentStep + 1}/{instructions.length})
              </div>
              <p className="line-clamp-2 font-medium">
                {instructions[currentStep]}
              </p>
            </div>

            {/* Main Voice Toggle Button */}
            <button
              onClick={isListening ? stopListening : startListening}
              className={`w-full relative overflow-hidden flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                isListening ? "voice-btn-listening" : ""
              }`}
              style={{
                background: isListening
                  ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)"
                  : "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)",
                color: "white",
                boxShadow: isListening
                  ? "0 8px 32px rgba(255, 107, 107, 0.4)"
                  : "0 4px 16px rgba(255, 107, 107, 0.2)",
                transform: "translateZ(0)",
              }}
            >
              {/* Ripple container */}
              <span className="ripple-container" />

              {/* Button content */}
              <span className="relative z-10 flex items-center gap-3">
                {isListening ? (
                  <>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="6" y="4" width="4" height="16" rx="2" />
                      <rect x="14" y="4" width="4" height="16" rx="2" />
                    </svg>
                    <span className="text-base">Stop Listening</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3z" />
                      <path d="M17 11a5 5 0 01-10 0H5a7 7 0 0014 0h-2z" />
                      <path
                        d="M12 18v4M8 22h8"
                        strokeWidth="2"
                        stroke="currentColor"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-base">Start Voice Control</span>
                  </>
                )}
              </span>

              {/* Animated rings on button when listening */}
              {isListening && (
                <span
                  className="absolute inset-0 rounded-2xl opacity-50"
                  style={{
                    border: "2px solid rgba(255,255,255,0.5)",
                    animation: "voicePulseRing 2s ease-out infinite",
                  }}
                />
              )}
            </button>

            {/* Secondary Actions */}
            <div className="flex gap-2">
              {/* Speak Button */}
              {speechSupported && (
                <button
                  onClick={readCurrentStep}
                  disabled={isSpeaking}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                  style={{
                    background: isSpeaking
                      ? "linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent) 100%)"
                      : "var(--background)",
                    border: "1px solid var(--card-border)",
                    color: isSpeaking ? "white" : "var(--foreground)",
                    boxShadow: isSpeaking
                      ? "0 4px 16px rgba(78, 205, 196, 0.3)"
                      : "none",
                  }}
                >
                  {isSpeaking ? (
                    <div
                      className="sound-wave-container"
                      style={{ height: "16px" }}
                    >
                      <div
                        className="sound-wave-bar"
                        style={{ width: "3px" }}
                      />
                      <div
                        className="sound-wave-bar"
                        style={{ width: "3px" }}
                      />
                      <div
                        className="sound-wave-bar"
                        style={{ width: "3px" }}
                      />
                    </div>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                  )}
                  <span className="text-sm">
                    {isSpeaking ? "Speaking..." : "Read Step"}
                  </span>
                </button>
              )}

              {/* Timer Button */}
              <button
                onClick={() => onStartTimer(currentStep)}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "var(--background)",
                  color: "var(--foreground-secondary)",
                  border: "1px solid var(--card-border)",
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" strokeWidth="2" />
                  <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2" />
                </svg>
                <span className="text-sm">Timer</span>
              </button>
            </div>

            {/* Quick Done Button */}
            <button
              onClick={() => {
                if (currentStep < instructions.length) {
                  onStepComplete(currentStep);
                  if (currentStep + 1 < instructions.length) {
                    setTimeout(() => {
                      speak(
                        `Step ${currentStep + 2}: ${
                          instructions[currentStep + 1]
                        }`
                      );
                    }, 300);
                  }
                }
              }}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2"
              style={{
                background: "transparent",
                color: "var(--accent)",
                border: "2px solid var(--accent)",
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Mark Complete & Next
            </button>

            {/* Command Feedback */}
            {showCommandFeedback && lastCommand && (
              <div
                className="command-feedback p-3 rounded-xl text-sm text-center flex items-center justify-center gap-2"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)",
                  color: "white",
                  boxShadow: "0 4px 16px rgba(255, 107, 107, 0.3)",
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3z" />
                </svg>
                <span>Heard: &quot;{lastCommand}&quot;</span>
              </div>
            )}

            {/* Voice Commands Help - Collapsible style */}
            <div
              className="text-xs p-3 rounded-xl"
              style={{
                background: "var(--background)",
                color: "var(--foreground-secondary)",
                border: "1px solid var(--card-border)",
              }}
            >
              <p
                className="font-semibold mb-2 flex items-center gap-2"
                style={{ color: "var(--foreground)" }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Voice Commands
              </p>
              <div className="flex flex-wrap gap-1">
                {["Done", "Next", "Repeat", "Timer", "Step #", "Help"].map(
                  (cmd) => (
                    <span
                      key={cmd}
                      className="px-2 py-1 rounded-md text-xs"
                      style={{
                        background: "var(--background-secondary)",
                        border: "1px solid var(--card-border)",
                      }}
                    >
                      &quot;{cmd}&quot;
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
