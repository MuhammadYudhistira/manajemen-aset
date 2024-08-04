import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateRepairImages = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ body }) => {
      const response = await axiosPrivate.post(`/perbaikan-images`, body);
      return response;
    },
    onSuccess,
    onError,
  });
};
