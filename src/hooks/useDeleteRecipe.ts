import api from "@/services/api";
import { HttpStatusCode } from "axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteRecipe = (token: string) => {
    const queryClient = useQueryClient();
    
    const deleteRecipeMutation = useMutation({
        
        mutationFn: async (recipeId: string) => {
            // eslint-disable-next-line no-debugger
            debugger
            console.log("recipe to delete",recipeId)
            const response = await api.delete(`/recipe/${recipeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        },
        onSuccess: (response) => {
            if (response.status === HttpStatusCode.NoContent) {
                queryClient.invalidateQueries({ queryKey: ['recipes']});
                queryClient.invalidateQueries({ queryKey: ['filteredRecipes']  });
            }
        },
        onError: (error: Error) => {
            console.error('Erro ao deletar receita:', error);
        }
    });

    const setRecipeId = (recipeId: string) => {
        if (recipeId) {
            deleteRecipeMutation.mutate(recipeId);
        }
    };

    return { 
        error: deleteRecipeMutation.error?.message || "", 
        setError: () => {}, 
        success: deleteRecipeMutation.isSuccess, 
        setRecipeId,
        isLoading: deleteRecipeMutation.isPending
    };
};

export default useDeleteRecipe;