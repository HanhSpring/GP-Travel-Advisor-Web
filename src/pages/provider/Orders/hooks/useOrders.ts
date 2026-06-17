import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrdersByPlace, updateOrderStatus } from '@/services/order.service';

export const useOrders = (placeId: string) => {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ['orders', placeId],
    queryFn: () => getOrdersByPlace(placeId),
    enabled: !!placeId,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: 'processing' | 'completed' }) => 
      updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', placeId] });
    },
  });

  return {
    orders: ordersQuery.data || [],
    isLoading: ordersQuery.isLoading,
    isError: ordersQuery.isError,
    error: ordersQuery.error,
    updateStatus: updateStatusMutation.mutateAsync,
  };
};
