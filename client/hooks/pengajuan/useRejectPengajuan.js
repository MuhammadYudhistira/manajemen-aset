import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useRejectPengajuan = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ no, keterangan }) => {
      const response = await axiosPrivate.post(`/pengajuan/${no}/reject`, {
        keterangan,
      });
      console.log(response);
      return response;
    },
    onSuccess,
    onError,
  });
};
