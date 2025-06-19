import { useState, useEffect } from "react";
import axios from "axios";
import type { RecipeFormData, RecipeFormProps } from "@/types/recipe";
import type { Instruction } from "@/types/instructions";

export function useRecipeForm({ recipeId, onSuccess }: RecipeFormProps) {
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

  // Ingredientes
  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };
  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };
  const updateIngredient = (index: number, value: string) => {
    setFormData((prev) => {
      const newIngredients = [...prev.ingredients];
      newIngredients[index] = value;
      return { ...prev, ingredients: newIngredients };
    });
  };


  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [
        ...prev.instructions,
        { step: prev.instructions.length + 1, text: "", id: "", active: true },
      ],
    }));
  };
  const removeInstruction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions
        .filter((_, i) => i !== index)
        .map((instruction, i) => ({ ...instruction, step: i + 1 })),
    }));
  };
  const updateInstruction = (index: number, value: string) => {
    setFormData((prev) => {
      const newInstructions = [...prev.instructions];
      newInstructions[index] = { ...newInstructions[index], text: value };
      return { ...prev, instructions: newInstructions };
    });
  };

  return {
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
  };
} 