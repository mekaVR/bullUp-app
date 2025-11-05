// eslint-disable-next-line import/no-named-as-default
import api from "@/app/api/axios.config";
import { API_ENDPOINTS } from "@/constants/api";
import {
  ComicBook,
  ComicBookQueryParams,
  ComicBooksListResponse,
} from "@/services/comicBook/interfaces/comicBook.interfaces";

export const comicBookService = {
  /**
   * Get all comic books with optional filters
   * @param params - Query parameters for filtering and pagination
   * @returns Paginated list of comic books
   */
  getComicBooks: async (
    params?: ComicBookQueryParams,
  ): Promise<ComicBooksListResponse> => {
    const response = await api.get<ComicBooksListResponse>(
      API_ENDPOINTS.COMIC_BOOKS,
      { params },
    );
    return response.data;
  },

  /**
   * Get a specific comic book by ID
   * @param id - Comic book ID
   * @returns Comic book details
   */
  getComicBookById: async (id: number): Promise<ComicBook> => {
    const response = await api.get<ComicBook>(
      `${API_ENDPOINTS.COMIC_BOOKS}${id}/`,
    );
    return response.data;
  },

  /**
   * Search comic books by title or author
   * @param query - Search query
   * @returns List of matching comic books
   */
  searchComicBooks: async (query: string): Promise<ComicBooksListResponse> => {
    const response = await api.get<ComicBooksListResponse>(
      API_ENDPOINTS.COMIC_BOOKS,
      {
        params: { search: query },
      },
    );
    return response.data;
  },

  /**
   * Get comic books by author
   * @param author - Author name
   * @returns List of comic books by the author
   */
  getComicBooksByAuthor: async (
    author: string,
  ): Promise<ComicBooksListResponse> => {
    const response = await api.get<ComicBooksListResponse>(
      API_ENDPOINTS.COMIC_BOOKS,
      {
        params: { author },
      },
    );
    return response.data;
  },
};

export default comicBookService;
