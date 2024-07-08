import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditDA = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ id, iddetail, body }) => {
      const response = await axios.patch(
        `/aset/${id}/detail-aset/${iddetail}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response;
    },
    onSuccess,
    onError,
  });
};
