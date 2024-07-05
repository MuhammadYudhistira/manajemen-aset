import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditUser = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ id, body }) => {
      const response = await axios.patch(`/user/${id}`, body, {
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
