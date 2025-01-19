import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateRuangan = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const response = await axios.post("/lokasi", {
        nama_lokasi: body,
      });
      console.log(response);
      return response;
    },
    onSuccess,
    onError,
  });
};
