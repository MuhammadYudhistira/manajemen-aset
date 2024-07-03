import axios from "@/libs/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchCustodian = () =>{
    return useQuery({
        queryFn: async() =>{
            const response = await axios.get("penanggung-jawab")
            console.log(response)
            return response.data.payload
        },
        queryKey: ["penanggungJawab"],
        initialData: ["penanggungJawab"]
    })
}