import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import axios from "axios";
import type { RecipeFormData, RecipeFormProps } from "@/types/recipe";
import type { Instruction } from "@/types/instructions";

const RecipeForm: React.FC<RecipeFormProps> = ({
  recipeId,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: "",
    cookingTime: 0,
    difficulty: 0,
    ingredients: [""],
    instructions: [{ step: 1, text: "", id: "", active: true }],
    dishTypes: [],
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (recipeId) {
      const token = localStorage.getItem("jwtToken");
      axios
        .get(`${baseUrl}/recipe/${recipeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          setFormData({
            ...data,
            ingredients: Array.isArray(data.ingredients)
              ? data.ingredients.map((i: string | { item: string }) =>
                  typeof i === "string" ? i : i.item || ""
                )
              : [""],
            instructions: Array.isArray(data.instructions)
              ? data.instructions.map((i: Instruction) => ({
                  step: i.step,
                  text: i.text,
                  id: i.id || "", 
                  active: i.active || false,
                }))
              : [{ step: 1, text: "", id: "", active: true }],
          });
        })
        .catch((error) => console.error(error.message));
    }
  }, [recipeId]);

  const uploadImage = async (id: string, file: File) => {
    const token = localStorage.getItem("jwtToken");
    const imageFormData = new FormData();
    imageFormData.append("file", file);

    try {
      await axios.put(`${baseUrl}/recipe/image/${id}`, imageFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setImageFile(null);
      alert("Imagem atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar imagem:", error);
      alert("Falha ao atualizar imagem.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");

    try {
      if (recipeId) {
        await axios.put(`${baseUrl}/recipe/${recipeId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (imageFile) {
          await uploadImage(recipeId, imageFile);
        }
      } else {
        const formDataToSend = new FormData();
        
        formDataToSend.append('Title', formData.title);
        formDataToSend.append('CookingTime', formData.cookingTime.toString());
        formDataToSend.append('Difficulty', formData.difficulty.toString());

        formData.ingredients.forEach((ingredient, index) => {
          formDataToSend.append(`Ingredients[${index}]`, ingredient);
        });

        formData.instructions.forEach((instruction, index) => {
          formDataToSend.append(`Instructions[${index}][step]`, instruction.step.toString());
          formDataToSend.append(`Instructions[${index}][text]`, instruction.text);
        });

        formData.dishTypes.forEach((dishType, index) => {
          formDataToSend.append(`DishTypes[${index}]`, dishType.toString());
        });

        if (imageFile) {
          formDataToSend.append('image', imageFile);
        }

        await axios.post(`${baseUrl}/recipe`, formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    });
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: newIngredients,
    });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [
        ...formData.instructions,
        { step: formData.instructions.length + 1, text: "", id: "", active: true },
      ],
    });
  };

  const removeInstruction = (index: number) => {
    setFormData({
      ...formData,
      instructions: formData.instructions
        .filter((_, i) => i !== index)
        .map((instruction, i) => ({ ...instruction, step: i + 1 })),
    });
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = { ...newInstructions[index], text: value };
    setFormData({
      ...formData,
      instructions: newInstructions,
    });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            placeholder="Título da receita"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            className="mb-4"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            value={formData.cookingTime.toString()}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                cookingTime: parseInt(value),
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Tempo de preparo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Rápido</SelectItem>
              <SelectItem value="1">Médio</SelectItem>
              <SelectItem value="2">Longo</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={formData.difficulty.toString()}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                difficulty: parseInt(value),
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Dificuldade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Fácil</SelectItem>
              <SelectItem value="1">Médio</SelectItem>
              <SelectItem value="2">Difícil</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Prato
          </label>
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                dishTypes: [parseInt(value)],
              })
            }
            value={formData.dishTypes[0]?.toString() || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar Tipo de Prato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Café da Manhã</SelectItem>
              <SelectItem value="1">Almoço</SelectItem>
              <SelectItem value="2">Aperitivos</SelectItem>
              <SelectItem value="3">Lanche</SelectItem>
              <SelectItem value="4">Sobremesa</SelectItem>
              <SelectItem value="5">Jantar</SelectItem>
              <SelectItem value="6">Bebidas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Ingredientes</h3>
            <Button type="button" onClick={addIngredient} className="mt-2">
              Adicionar Ingrediente
            </Button>
          </CardHeader>
          <CardContent>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Input
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder="Nome do ingrediente"
                  required
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeIngredient(index)}
                >
                  Remover
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Instruções</h3>
            <Button type="button" onClick={addInstruction} className="mt-2">
              Adicionar Instrução
            </Button>
          </CardHeader>
          <CardContent>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="space-y-2 mb-4">
                <p className="font-medium">Passo {instruction.step}</p>
                <Textarea
                  value={instruction.text}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  placeholder="Descreva o passo da receita"
                  required
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeInstruction(index)}
                >
                  Remover
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagem da Receita
          </label>
          {formData.imageUrl && !imageFile && recipeId && (
            <img src={formData.imageUrl} alt="Pré-visualização da imagem" className="w-32 h-32 object-cover mb-4 rounded" />
          )}
          <Input
            type="file"
            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            accept="image/*"
          />
          {recipeId && imageFile && (
            <Button
              type="button"
              onClick={() => uploadImage(recipeId, imageFile)}
              className="mt-2"
            >
              Atualizar Imagem
            </Button>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Salvar Receita</Button>
        </div>
      </form>
    </Card>
  );
};

export default RecipeForm; 