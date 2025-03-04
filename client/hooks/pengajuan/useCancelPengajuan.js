import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useCancelPengajuan = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async (no) => {
      const response = await axiosPrivate.post(`/pengajuan/${no}/cancel`);
      console.log(response);
      return response;
    },
    onSuccess,
    onError,
  });
};
