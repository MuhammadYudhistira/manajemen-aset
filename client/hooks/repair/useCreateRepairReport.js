import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateRepairReport = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ id, body }) => {
      const response = await axiosPrivate.post(
        `/laporan-perbaikan/${id}/laporan`,
        body,
      );
      return response;
    },
    onSuccess,
    onError,
  });
};
