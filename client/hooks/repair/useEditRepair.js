import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditRepair = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ id, body }) => {
      const response = await axiosPrivate.patch(
        `/laporan-perbaikan/${id}`,
        body,
      );
      return response;
    },
    onSuccess,
    onError,
  });
};
