import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export function useUserGet() {
  const fetchUser = async () => {
    const token = localStorage.getItem('jwtToken');
    const response = await api.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    enabled: !!localStorage.getItem('jwtToken'),
  });

  return { user: data, isLoading, error, refetch };
} 