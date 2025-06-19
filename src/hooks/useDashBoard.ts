import api from "@/services/api";
import type { RecipeParams } from "@/types/recipeParams";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";

const useDashBoard = () => {
    const [params, setParams] = useState<RecipeParams>({
        direction: "asc",
        pageNumber: 1,
        pageSize: 10
    })
    
    const token = localStorage.getItem("jwtToken");
    const fetchRecipes = async () => {
        if (!token) {
            console.warn('Token não encontrado');
            return [];
        }
        try {
            const response = await api.get("/dashboard", {
                params: params,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            return response.data?.recipes || [];
        } catch (error) {
            console.error('Erro ao buscar receitas:', error);
            return [];
        }
    };

    const { 
        data: recipes = [], 
        isLoading, 
        error, 
        refetch 
    } = useQuery({
        queryKey: ['recipes', params, token],
        queryFn: fetchRecipes,
        enabled: !!token,
    });

    return { 
        recipes, 
        setRecipes: () => {}, 
        setUpdate: refetch, 
        setParams, 
        error: error?.message || "", 
        setError: () => {},
        isLoading 
    };
};

export default useDashBoard;