import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCustodian = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`/penanggung-jawab/${id}`);
      console.log(response);
      return response;
    },
    onError,
    onSuccess,
  });
};
