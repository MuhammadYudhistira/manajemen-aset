import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreatePengajuan = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const response = await axiosPrivate.post("/pengajuan", body);
      console.log(response);
      return response;
    },
    onSuccess,
    onError,
  });
};
