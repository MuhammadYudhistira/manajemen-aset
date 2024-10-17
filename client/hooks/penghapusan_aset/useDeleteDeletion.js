import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDeletion = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosPrivate.delete(`/deletion/${id}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess,
    onError,
  });
};
