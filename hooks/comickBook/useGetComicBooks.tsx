import { useQuery } from "@tanstack/react-query";
import ComicBookService from "@/services/comicBook/comicBook.service";

export default function useGetComicBooks() {
  return useQuery({
    queryKey: ["get comic-books"],
    queryFn: () => ComicBookService.getComicBooks(),
  });
}
