import React, { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import type { Recipe } from "@/types/recipe";

const getDifficultyInfo = (difficulty: number) => {
  switch (difficulty) {
    case 1:
      return { label: "Fácil", color: "bg-green-500" };
    case 2:
      return { label: "Médio", color: "bg-yellow-500" };
    case 3:
      return { label: "Difícil", color: "bg-red-500" };
    default:
      return { label: "Não especificado", color: "bg-gray-500" };
  }
};

const getCookingTimeLabel = (cookingTime: number) => {
  switch (cookingTime) {
    case 0:
      return "Menos de 10 minutos";
    case 1:
      return "Entre 10 e 30 minutos";
    case 2:
      return "Entre 30 e 60 minutos";
    case 3:
      return "Mais de 60 minutos";
    default:
      return "Tempo desconhecido";
  }
};

const dishTypeLabels: Record<number, string> = {
  0: "Café da manhã",
  1: "Almoço",
  2: "Aperitivos",
  3: "Lanche",
  4: "Sobremesa",
  5: "Jantar",
  6: "Bebidas"
};

interface RecipeCardModalProps {
  recipeId: string;
  trigger?: React.ReactNode;
}

const RecipeCardModal = ({ recipeId, trigger }: RecipeCardModalProps) => {
  console.log(recipeId);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("jwtToken");
  const [recipe, setRecipe] = useState<Recipe>();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      axios
        .get(baseUrl + "/recipe/" + recipeId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setRecipe(response.data);
        });
    }
  }, [baseUrl, recipeId, token, open]);
  return (
    <>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="bg-white shadow-2xl rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {recipe?.title}
            </DialogTitle>

          </DialogHeader>
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
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">Prep Time</div>
                    <div className="font-semibold">
                      {getCookingTimeLabel(recipe?.cookingTime ?? -1)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <ChefHat className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">
                      Tempo de cozimento
                    </div>
                    <div className="font-semibold">
                      {getCookingTimeLabel(recipe?.cookingTime ?? -1)}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Dificuldade
                      </span>
                      <Badge
                        variant={
                          recipe?.difficulty === 1
                            ? "secondary"
                            : recipe?.difficulty === 2
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
                          getDifficultyInfo(recipe.difficulty).label}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Tipo de Prato
                      </span>
                      <Badge variant="outline" className="justify-center">
                        {recipe?.dishTypes && recipe.dishTypes.length > 0
                          ? recipe.dishTypes.map((type: number) => dishTypeLabels[type] || `Tipo ${type}`).join(", ")
                          : "Não especificado"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ingredientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recipe?.ingredients.map((ingredient) => (
                      <>
                        {ingredient.item.map((i, index) => (
                          <li key={index} className="flex items-start gap-2">
                            {i}
                          </li>
                        ))}
                      </>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecipeCardModal;
