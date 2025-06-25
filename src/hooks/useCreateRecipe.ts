import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';

export function useCreateRecipe(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const createRecipeMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const token = localStorage.getItem('jwtToken');
      const response = await api.post('/recipe', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      queryClient.invalidateQueries({ queryKey: ['filteredRecipes'] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      console.error('Erro ao criar receita:', error);
    },
  });

  return {
    createRecipe: createRecipeMutation.mutate,
    isLoading: createRecipeMutation.isPending,
    error: createRecipeMutation.error,
    isSuccess: createRecipeMutation.isSuccess,
  };
}

export function useUpdateRecipe(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const updateRecipeMutation = useMutation({
    mutationFn: async ({ recipeId, formData }: { recipeId: string; formData: any }) => {
      const token = localStorage.getItem('jwtToken');
      const response = await api.put(`/recipe/${recipeId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      queryClient.invalidateQueries({ queryKey: ['filteredRecipes'] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      console.error('Erro ao atualizar receita:', error);
    },
  });

  return {
    updateRecipe: updateRecipeMutation.mutate,
    isLoading: updateRecipeMutation.isPending,
    error: updateRecipeMutation.error,
    isSuccess: updateRecipeMutation.isSuccess,
  };
}
