import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';
import type { User } from '@/types/user';
import { HttpStatusCode, AxiosError } from 'axios';
import type { ErrorResponse } from '@/types/errorResponse';

export function useRegisterUser() {
  const mutation = useMutation({
    mutationFn: async (user: User) => {
      const response = await api.post('/user', user, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response;
    },
  });

  const registerUser = async (user: User, setMessage: (msg: string[]) => void) => {
    mutation.mutate(user, {
      onSuccess: (response) => {
        if (response.status === HttpStatusCode.Created) {
          setMessage(['Usuário registrado com sucesso!']);
        }
      },
      onError: (err: AxiosError<ErrorResponse>) => {
        const errors = err.response?.data.errors;
        setMessage(errors as string[] ?? ['Erro ao registrar usuário.']);
      },
    });
  };

  return {
    registerUser,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    message: '',
  };
} 