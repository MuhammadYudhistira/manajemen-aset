import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDP = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ id }) => {
      const response = await axios.delete(`/detail-pengadaan/${id}`);
      return response;
    },
    onError,
    onSuccess,
  });
};
