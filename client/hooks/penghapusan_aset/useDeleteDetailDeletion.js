import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDetailDeletion = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosPrivate.delete(`/deletion/detail/${id}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess,
    onError,
  });
};
