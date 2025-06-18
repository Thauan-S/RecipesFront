import React, { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, Star, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import type { Recipe } from "@/types/recipe";
import CreateRecipeForm from "./RecipeForm";
import { useAppContext } from "@/context/appContext";

const getDifficultyInfo = (difficulty: number) => {
  switch (difficulty) {
    case 0:
      return { text: "Fácil", color: "text-green-600" };
    case 1:
      return { text: "Médio", color: "text-yellow-600" };
    case 2:
      return { text: "Difícil", color: "text-red-600" };
    default:
      return { text: "Desconhecido", color: "text-gray-600" };
  }
};

const getCookingTimeInfo = (time: number) => {
  switch (time) {
    case 0:
      return "Rápido";
    case 1:
      return "Médio";
    case 2:
      return "Longo";
    default:
      return "Desconhecido";
  }
};

const getDishTypeInfo = (type: number) => {
  switch (type) {
    case 0:
      return "Café da Manhã";
    case 1:
      return "Almoço";
    case 2:
      return "Aperitivos";
    case 3:
      return "Lanche";
    case 4:
      return "Sobremesa";
    case 5:
      return "Jantar";
    case 6:
      return "Bebidas";
    default:
      return "Desconhecido";
  }
};

interface RecipeCardModalProps {
  recipeId: string;
  trigger: React.ReactNode;
  onSuccess?: () => void;
}

const RecipeCardModal: React.FC<RecipeCardModalProps> = ({
  recipeId,
  trigger,
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [recipe, setRecipe] = useState<Recipe>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
    setIsEditing(false);
    onSuccess?.();
  };
  const{setRecipeId}=useAppContext()
  const handleDelete =  () => {
   setRecipeId(recipeId)
      handleSuccess(); 
  };

  useEffect(() => {
    if (isOpen) {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const token = localStorage.getItem("jwtToken");
      axios
        .get(baseUrl + "/recipe/" + recipeId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setRecipe(response.data);
        })
        .catch((error) => console.error(error.message));
    }
  }, [isOpen, recipeId]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl bg-white overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Receita" : "Detalhes da Receita"}
          </DialogTitle>
        </DialogHeader>
        {isEditing ? (
          <CreateRecipeForm
            recipeId={recipeId}
            onSuccess={handleSuccess}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={recipe?.imageUrl}
                    alt={recipe?.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-white">
                    <CardContent className="p-4 text-center">
                      <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm text-muted-foreground">Prep Time</div>
                      <div className="font-semibold">
                        {getCookingTimeInfo(recipe?.cookingTime || 0)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardContent className="p-4 text-center">
                      <ChefHat className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm text-muted-foreground">
                        Tempo de cozimento
                      </div>
                      <div className="font-semibold">
                        {getCookingTimeInfo(recipe?.cookingTime || 0)}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white">
                    <CardContent className="p-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          Dificuldade
                        </span>
                        <Badge
                          variant={
                            recipe?.difficulty === 0
                              ? "secondary"
                              : recipe?.difficulty === 1
                              ? "default"
                              : "destructive"
                          }
                          className={`w-full justify-center ${
                            recipe?.difficulty
                              ? getDifficultyInfo(recipe.difficulty).color
                              : ""
                          }`}
                        >
                          {recipe?.difficulty &&
                            getDifficultyInfo(recipe.difficulty).text}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white">
                    <CardContent className="p-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          Tipo de Prato
                        </span>
                        <Badge variant="outline" className="justify-center">
                          {recipe?.dishTypes && recipe.dishTypes.length > 0
                            ? recipe.dishTypes.map((type: number) => getDishTypeInfo(type)).join(", ")
                            : "Não especificado"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="space-y-6">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Ingredientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {recipe?.ingredients.map((ingredient, index) => (
                        <React.Fragment key={index}>
                          {
                            <li  className="flex items-start gap-2">
                              - {ingredient.item}
                            </li>
                          }
                        </React.Fragment>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Instruções</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3">
                      {recipe?.instructions.map((instruction, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                            {instruction.step}
                          </span>
                          <span className="text-sm leading-relaxed">
                            {instruction.text}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1">
                <Star className="w-4 h-4 mr-2" />
                Save Recipe
              </Button>
              <Button variant="outline" className="flex-1">
                Share Recipe
              </Button>
            </div>

            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsEditing(true)}>Editar Receita</Button>
              <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </Button>
            </div>
          </div>
        )}
      </DialogContent>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta receita? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default RecipeCardModal;
