import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useConfirmDeletion = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ id, body }) => {
      const response = await axiosPrivate.post(
        `/deletion/${id}/confirmation`,
        body,
      );
      console.log(response);
      return response;
    },
    onSuccess,
    onError,
  });
};
