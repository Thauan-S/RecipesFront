import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface IngredientsListProps {
  ingredients: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, value: string) => void;
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients, onAdd, onRemove, onUpdate }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold">Ingredientes</h3>
      <Button type="button" onClick={onAdd} className="mt-2">Adicionar Ingrediente</Button>
    </div>
    {ingredients.map((ingredient, index) => (
      <div key={index} className="flex items-center space-x-2 mb-2">
        <Input
          value={ingredient}
          onChange={(e) => onUpdate(index, e.target.value)}
          placeholder="Nome do ingrediente"
          required
        />
        <Button
          type="button"
          variant="destructive"
          onClick={() => onRemove(index)}
        >
          Remover
        </Button>
      </div>
    ))}
  </div>
);

export default IngredientsList; 