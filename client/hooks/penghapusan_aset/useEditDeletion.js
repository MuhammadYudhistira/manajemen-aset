import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditDeletion = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ id, body }) => {
      const response = await axiosPrivate.patch(`/deletion/${id}`, body);
      console.log(response);
      return response;
    },
    onSuccess,
    onError,
  });
};
