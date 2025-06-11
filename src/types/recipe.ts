import type { Instruction } from "./instructions";

export  interface Recipe{
    id: string;
  title: string;
  ingredients: {
    id: string;
    item: string; // ou item: string[] se você quiser fazer o parse de JSON
  }[];
  instructions: Instruction[]; // Pode ajustar para um tipo específico depois
  dishTypes: number[];
  cookingTime: number;
  difficulty: number;
  imageUrl: string;
}