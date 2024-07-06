import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateCustodian = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const response = await axios.post("/penanggung-jawab", body);
      return response;
    },
    onError,
    onSuccess,
  });
};
