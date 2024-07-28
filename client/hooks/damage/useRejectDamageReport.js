import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useRejectDamageReport = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ id, keterangan }) => {
      const response = await axiosPrivate.post(
        `/laporan-kerusakan/${id}/reject`,
        {
          keterangan,
        },
      );
      console.log(response);
      return response;
    },
    onSuccess,
    onError,
  });
};
