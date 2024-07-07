import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDAImage = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ id, iddetail, body }) => {
      const response = await axios.post(
        `/aset/${id}/detail-aset/${iddetail}/image`,
        {
          id: body.imageId,
          link: body.link,
        }
      );
      return response;
    },
    onSuccess,
    onError,
  });
};
