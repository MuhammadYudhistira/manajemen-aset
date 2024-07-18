import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateDamageReport = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const response = await axiosPrivate.post("/laporan-kerusakan", body, {
        "Content-Type": "multipart/form-data",
      });
      console.log(response);
      return response;
    },
    onSuccess,
    onError,
  });
};
