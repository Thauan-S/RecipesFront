import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Instruction } from "@/types/instructions";

interface InstructionsListProps {
  instructions: Instruction[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, value: string) => void;
}

const InstructionsList: React.FC<InstructionsListProps> = ({ instructions, onAdd, onRemove, onUpdate }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold">Instruções</h3>
      <Button type="button" onClick={onAdd} className="mt-2">Adicionar Instrução</Button>
    </div>
    {instructions.map((instruction, index) => (
      <div key={index} className="space-y-2 mb-4">
        <p className="font-medium">Passo {instruction.step}</p>
        <Textarea
          value={instruction.text}
          onChange={(e) => onUpdate(index, e.target.value)}
          placeholder="Descreva o passo da receita"
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

export default InstructionsList; 