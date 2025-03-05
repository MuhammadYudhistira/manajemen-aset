import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditDP = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ id, body }) => {
      const response = await axios.patch(`/detail-pengadaan/${id}`, body, {
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
