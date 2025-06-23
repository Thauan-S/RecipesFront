import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { RecipeFilterData } from "./components/RecipeFilter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import { useAppContext } from "@/context/appContext";
import CreateRecipeForm from "./components/RecipeForm";
import RecipeFilter from "./components/RecipeFilter";
import RecipeCard from "./components/RecipeCard";
import { Toaster } from "sonner";

const DashBoard = () => {
  const { token } = useParams();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("jwtToken", token);
    }
  }, [token]);
  const { 
    recipes, 
     isLoading, 
     setFilters,
     filteredRecipes
  } = useAppContext();

  const fetchRecipes = (filters?: RecipeFilterData) => {
    setFilters(filters);
  };
  const handleFilter = (filters: RecipeFilterData) => {
    fetchRecipes(filters);
  };

   if (isLoading) {
     return (
       <div className="container mx-auto p-4">
         <div className="flex justify-center items-center h-64">
           <div className="text-lg">Carregando receitas...</div>
         </div>
       </div>
     );
   }

  return (
    <div className="container mx-auto p-4">
         <Toaster />
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
            <CreateRecipeForm
              onSuccess={() => {
                setIsCreateModalOpen(false);
              }}
              onCancel={() => setIsCreateModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <RecipeFilter onFilter={handleFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes && filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <RecipeCard key={`filtered-${index}`} recipe={recipe}/>
          ))
        ) : (
          recipes && recipes.map((recipe, index) => (
            <RecipeCard key={`recipe-${index}`} recipe={recipe}/>
          ))
        )}
      </div>
    </div>
  );
};

export default DashBoard;
