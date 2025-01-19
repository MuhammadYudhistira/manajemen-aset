import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditRuangan = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ id, body }) => {
      const response = await axios.patch(`/lokasi/${id}`, {
        nama_lokasi: body,
      });
      return response;
    },
    onError,
    onSuccess,
  });
};
