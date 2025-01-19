import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditUser = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ nip, body }) => {
      const response = await axios.patch(`/user/${nip}`, body, {
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
