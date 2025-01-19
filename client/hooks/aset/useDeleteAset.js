import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAset = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (kode) => {
      try {
        const response = await axios.delete(`/aset/${kode}`);
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess,
    onError,
  });
};
