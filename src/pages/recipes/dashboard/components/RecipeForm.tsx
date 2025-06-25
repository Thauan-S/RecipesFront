import React from "react";


import IngredientsList from "./IngredientsList";
import InstructionsList from "./InstructionsList";
import ImageUpload from "./ImageUpload";
import { useRecipeForm } from "../../../../hooks/useRecipeForm";
import type { RecipeFormProps } from "@/types/recipe";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSelect from "./FormSelect";

const RecipeForm: React.FC<RecipeFormProps> = (props) => {
  const {
    formData,
    setFormData,
    handleSubmit,
    addIngredient,
    removeIngredient,
    updateIngredient,
    addInstruction,
    removeInstruction,
    updateInstruction,
    imageFile,
    setImageFile,
    uploadImage,
  } = useRecipeForm(props);


  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            placeholder="Título da receita"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="mb-4"
          />
        </div>

        <div className="flex justify-between gap-4">
          <FormSelect
            label="Tempo de preparo"
            value={formData.cookingTime.toString()}
            onValueChange={(value) => setFormData({ ...formData, cookingTime: parseInt(value) })}
            options={[
              { value: "0", label: "Rápido" },
              { value: "1", label: "Médio" },
              { value: "2", label: "Longo" },
            ]}
          />
          <FormSelect
            label="Dificuldade"
            value={formData.difficulty.toString()}
            onValueChange={(value) => setFormData({ ...formData, difficulty: parseInt(value) })}
            options={[
              { value: "0", label: "Fácil" },
              { value: "1", label: "Médio" },
              { value: "2", label: "Difícil" },
            ]}
          />
        </div>

        <FormSelect
          label="Tipo de Prato"
          value={formData.dishTypes[0]?.toString() || ""}
          onValueChange={(value) => setFormData({ ...formData, dishTypes: [parseInt(value)] })}
          options={[
            { value: "0", label: "Café da Manhã" },
            { value: "1", label: "Almoço" },
            { value: "2", label: "Aperitivos" },
            { value: "3", label: "Lanche" },
            { value: "4", label: "Sobremesa" },
            { value: "5", label: "Jantar" },
            { value: "6", label: "Bebidas" },
          ]}
        />

        <IngredientsList
          ingredients={formData.ingredients}
          onAdd={addIngredient}
          onRemove={removeIngredient}
          onUpdate={updateIngredient}
        />

        <InstructionsList
          instructions={formData.instructions}
          onAdd={addInstruction}
          onRemove={removeInstruction}
          onUpdate={updateInstruction}
        />

        <ImageUpload
          imageUrl={formData.imageUrl}
          imageFile={imageFile}
          setImageFile={setImageFile}
          onUpload={props.recipeId && imageFile ? () => uploadImage(props.recipeId!, imageFile) : undefined}
          recipeId={props.recipeId}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={props.onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Salvar Receita</Button>
        </div>
      </form>
    </Card>
  );
};

export default RecipeForm; 