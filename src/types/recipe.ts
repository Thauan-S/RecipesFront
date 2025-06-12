import type { Instruction } from "./instructions";

export  interface Recipe{
    id: string;
  title: string;
  ingredients: {
    id: string;
    item: string[]; 
  }[];
  instructions: Instruction[]; 
  dishTypes: number[];
  cookingTime: number;
  difficulty: number;
  imageUrl: string;
}

export interface RecipeFormData {
  title: string;
  cookingTime: number;
  difficulty: number;
  ingredients: string[];
  instructions: Instruction[];
  dishTypes: number[];
  imageUrl?: string;
}

export interface RecipeFormProps {
  recipeId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}