import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditAset = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ id, body }) => {
      try {
        const response = await axios.patch(`/aset/${id}`, body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
        throw new Error(
          error.response?.data?.message || "Failed to edit asset",
        );
      }
    },
    onSuccess,
    onError,
  });
};
