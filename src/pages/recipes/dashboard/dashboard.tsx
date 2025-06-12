import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ResponseShortRecipes } from "@/types/responseShortRecipesJson";
import RecipeCardModal from "./components/RecipeCardModal";
import RecipeFilter from "./components/RecipeFilter";
import type { RecipeFilterData } from "./components/RecipeFilter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RecipeForm from "./components/RecipeForm";
import { Plus } from "lucide-react";

const DashBoard = () => {
  const { token } = useParams();
  const [recipes, SetRecipes] = useState<ResponseShortRecipes[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchRecipes = (filters?: RecipeFilterData) => {
    if (token) {
      const token = localStorage.getItem("jwtToken");
      const endpoint = filters ? "/recipe/filter" : "/dashboard";
      const config = filters
        ? {
            data: filters,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {
            params: { pageNumber: 1, pageSize: 10, direction: "desc" },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

      axios
        .post(baseUrl + endpoint, config.data, {
          headers: config.headers,
        })
        .then((response) => {
          SetRecipes(response.data.recipes);
        })
        .catch((error) => console.error(error.message));
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("jwtToken", token);
      fetchRecipes();
    }
  }, []);

  const handleFilter = (filters: RecipeFilterData) => {
    fetchRecipes(filters);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Minhas Receitas</h1>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Criar Receita
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl bg-white overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Criar Nova Receita</DialogTitle>
            </DialogHeader>
            <RecipeForm
              onSuccess={() => {
                setIsCreateModalOpen(false);
                fetchRecipes();
              }}
              onCancel={() => setIsCreateModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <RecipeFilter onFilter={handleFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes &&
          recipes.map((r, index) => (
            <Card
              key={index}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="p-0">
                <img
                  src={r.imageUrl}
                  alt={r.title}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold mb-2">
                  {r.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Quantidade de ingredientes: {r.amountIngredients}
                </p>
                <div className="mt-4">
                  <RecipeCardModal
                    recipeId={r.id}
                    trigger={<Button className="w-full">Ver receita</Button>}
                    onSuccess={() => fetchRecipes()}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default DashBoard;
