import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';

export function useUserUpdate(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: async (userData: any) => {
      const token = localStorage.getItem('jwtToken');
      const response = await api.put('/user', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      console.error('Erro ao atualizar usuário:', error);
    },
  });

  return {
    updateUser: updateUserMutation.mutate,
    isLoading: updateUserMutation.isPending,
    error: updateUserMutation.error,
    isSuccess: updateUserMutation.isSuccess,
  };
} 