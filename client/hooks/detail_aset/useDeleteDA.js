import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDA = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ id, iddetail }) => {
      const response = await axios.delete(
        `/aset/${id}/detail-aset/${iddetail}`,
      );
      return response;
    },
    onError,
    onSuccess,
  });
};
