import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'sonner';

export function useUserDelete(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('jwtToken');
      const response = await api.delete('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success("Usuário deletado com sucesso",{className:"text-green-500"})
      onSuccess?.();
    },
    onError: (error: Error) => {
      console.error('Erro ao deletar usuário:', error);
    },
  });
 
  return {
    deleteUser: deleteUserMutation.mutate,
    isLoading: deleteUserMutation.isPending,
    error: deleteUserMutation.error,
    isSuccess: deleteUserMutation.isSuccess,
  };
} 