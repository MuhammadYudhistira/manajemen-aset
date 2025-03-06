import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

export const useSearchDP = (search) => {
  const [debouncedSearch] = useDebounce(search, 1000);

  return useQuery({
    queryKey: ["search-detail-pengadaan", debouncedSearch],
    queryFn: async () => {
      const response = await axios.get(
        `/detail-pengadaan/search?kode=${debouncedSearch}`,
      );
      return response.data.payload;
    },
    // Memastikan refetch saat ada perubahan pada debouncedSearch atau saat halaman pertama kali dimuat
    enabled: debouncedSearch.length > 0 || search.length === 0, // Refetch ketika search kosong atau ada perubahan
  });
};
