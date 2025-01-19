import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDA = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ kode }) => {
      const response = await axios.delete(`/detail-aset/${kode}`);
      return response;
    },
    onError,
    onSuccess,
  });
};
