import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDamageReport = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosPrivate.delete(`/laporan-kerusakan/${id}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess,
    onError,
  });
};
