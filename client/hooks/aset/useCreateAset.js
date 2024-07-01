import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateAset = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      try {
        const response = await axios.post("/aset", body, {
          "Content-Type": "multipart/form-data",
        });
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess,
    onError,
  });
};
