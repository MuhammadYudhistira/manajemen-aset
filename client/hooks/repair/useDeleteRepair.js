import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteRepair = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axiosPrivate.delete(`/laporan-perbaikan/${id}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess,
    onError,
  });
};
