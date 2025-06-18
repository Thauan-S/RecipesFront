import type { RecipeFilterData } from "@/pages/recipes/dashboard/components/RecipeFilter";
import api from "@/services/api";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";

const useFilterRecipes = (token: string, baseUrl: string) => {
  const [filters, setFilters] = useState<RecipeFilterData>();

  const fetchFilteredRecipes = async () => {
    if (!filters) return [];
    
    try {
      const response = await api.post(`${baseUrl}/recipe/filter`, filters, {
        headers: {  
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data?.recipes || [];
    } catch (error) {
      console.error('Erro ao filtrar receitas:', error);
      return [];
    }
  };

  const { 
    data: filteredRecipes = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['filteredRecipes', filters, token],
    queryFn: fetchFilteredRecipes,
    enabled: !!filters && !!token,
  });
  
  return { 
    filteredRecipes, 
    setfilteredRecipes: () => {}, 
    setUpdate: refetch, 
    setFilters 
  };
};

export default useFilterRecipes;