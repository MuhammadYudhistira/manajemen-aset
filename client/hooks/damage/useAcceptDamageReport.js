import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useAcceptDamageReport = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosPrivate.post(
        `/laporan-kerusakan/${id}/accept`,
      );
      console.log(response);
      return response;
    },
    onSuccess,
    onError,
  });
};
