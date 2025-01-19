import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDAImage = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ body }) => {
      const response = await axios.post(`/detail-aset/image`, {
        id: body.imageId,
        link: body.link,
      });
      return response;
    },
    onSuccess,
    onError,
  });
};
