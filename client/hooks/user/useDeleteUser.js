import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUser = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/user/${id}`);
      return response;
    },
    onSuccess,
    onError,
  });
};
