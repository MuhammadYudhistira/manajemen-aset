import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditDA = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ kode, body }) => {
      const response = await axios.patch(`/detail-aset/${kode}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    },
    onSuccess,
    onError,
  });
};
