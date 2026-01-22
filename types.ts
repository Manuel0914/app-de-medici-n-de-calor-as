
export interface UserProfile {
  age: string;
  weight: string;
  height: string;
  goal: 'lose_fat' | 'gain_muscle' | 'maintain';
  activity: 'sedentary' | 'moderate' | 'active' | 'very_active';
  preferences: string;
  budget: 'low' | 'medium' | 'high';
  time: 'low' | 'medium' | 'high';
}

export interface FoodAnalysis {
  summary: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  feedback: string[];
  suggestions: string[];
}

export interface FoodAnalysisEntry {
  id: string;
  timestamp: number;
  data: FoodAnalysis;
}

export interface Meal {
  name: string;
  description: string;
}

export interface DayPlan {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks?: Meal;
}

export interface MealPlan {
  type: 'minimum_effort' | 'varied';
  days: DayPlan[];
}

export interface ShoppingListItem {
  item: string;
  quantity: string;
  category: string;
  alternative?: string;
  healthyVersion?: string;
}

export interface ShoppingList {
  sections: {
    category: string;
    items: ShoppingListItem[];
  }[];
}

export enum AppTab {
  ANALYSIS = 'analysis',
  MEAL_PLAN = 'meal_plan',
  PROFILE = 'profile'
}
