import type { RecipeFilterData } from "@/pages/recipes/dashboard/components/RecipeFilter";
import api from "@/services/api";
import type { ResponseShortRecipes } from "@/types/responseShortRecipesJson";
import { useState, useEffect } from "react";

const useFilterRecipes = (token: string, baseUrl: string) => {
  const [filteredRecipes, setfilteredRecipes] = useState<ResponseShortRecipes[]>([]);
  const [update, setUpdate] = useState(true);
  const [filters, setFilters] = useState<RecipeFilterData>();

  useEffect(() => {
    if (filters)
    api
      .post(`${baseUrl}/recipe/filter`, filters, {
        headers: {  
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.recipes);
        setfilteredRecipes(res.data.recipes);
      })
      .catch((error) => {
        console.error(error);
      });
    
  }, [token, baseUrl, update, filters]);
  
  return { 
    filteredRecipes, 
    setfilteredRecipes, 
    setUpdate, 
    setFilters 
  };
};

export default useFilterRecipes;