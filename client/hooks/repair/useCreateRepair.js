import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateRepair = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const response = await axiosPrivate.post("/laporan-perbaikan", body);
      console.log(response);
      return response;
    },
    onSuccess,
    onError,
  });
};
