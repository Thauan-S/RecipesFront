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