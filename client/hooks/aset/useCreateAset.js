import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateAset = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const response = await axios.post("/aset", body, {
        "Content-Type": "multipart/form-data",
      });
      console.log(response);
      return response;
    },
    onSuccess,
    onError,
  });
};
