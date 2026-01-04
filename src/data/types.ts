// Recipe type definition - shared between recipe files
export interface Recipe {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  continent: string;
  region: string;
  description: string;
  image: string;
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  instructions: string[];
  stepTimes?: number[]; // Time in minutes for each instruction step
  tags: string[];
}

export interface Country {
  name: string;
  code: string;
  flag: string;
  continent: string;
}

export interface Continent {
  name: string;
  slug: string;
  description: string;
  image: string;
  color: string;
  countries: Country[];
}
