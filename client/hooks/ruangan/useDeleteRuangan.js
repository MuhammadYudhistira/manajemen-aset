import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteRuangan = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`/lokasi/${id}`);

      console.log(response);
      return response;
    },
    onSuccess,
    onError,
  });
};
