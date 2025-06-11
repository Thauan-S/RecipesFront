import React, { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Users, ChefHat, Star, Badge } from 'lucide-react';
import axios from 'axios';
import type { Recipe } from '@/types/recipe';


interface RecipeCardModalProps {
  recipeId: string;
  trigger?: React.ReactNode;
}

const RecipeCardModal = ({ recipeId, trigger }: RecipeCardModalProps) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const token=localStorage.getItem("jwtToken");
    const [recipe,setRecipe]=useState<Recipe>()
    const [error, setError] = useState("");
    useEffect(()=>{
        axios
        .get(baseUrl +"/recipe/"+recipeId, {
          params: { pageNumber: 1, pageSize: 10, direction: "desc" },
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        })
        .then((response) =>{ 
          console.log(response)
          setRecipe(response.data.recipes)})
        .catch((error) => setError(error.message));
    },[recipeId])
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger }
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{recipe?.title}</DialogTitle>
          <DialogDescription>{recipe?.title}</DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recipe Image and Info */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={recipe?.imageUrl} 
                alt={recipe?.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            
            {/* Recipe Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Prep Time</div>
                  <div className="font-semibold">{"recipe.prepTime"}m</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <ChefHat className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Cook Time</div>
                  <div className="font-semibold">{"recipe.cookTime"}m</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Servings</div>
                  <div className="font-semibold">{"recipe.servings"}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Badge 
                    variant={recipe?.difficulty === 1 ? "secondary" : recipe?.difficulty === 2 ? 'default' : 'destructive'}
                    className="w-full justify-center"
                  >
                    {recipe?.difficulty}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-2">
              
                <Badge  variant="outline" className="text-xs">
                 "ola"
                </Badge>
              
            </div>
          </div>

          {/* Ingredients and Instructions */}
          <div className="space-y-6">
            {/* Ingredients */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recipe?.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm">{ingredient.item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {recipe?.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-relaxed"> passo: {instruction.step}</span>
                      <span className="text-sm leading-relaxed">{instruction.text}</span>
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
  );
};

export default RecipeCardModal;