export interface ComicBook {
  id: number;
  title: string;
  description?: string;
  author?: string;
  cover_image?: string;
  published_date?: string;
  isbn?: string;
  pages?: number;
  publisher?: string;
  language?: string;
  rating?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ComicBooksListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ComicBook[];
}

export interface ComicBookQueryParams {
  page?: number;
  page_size?: number;
  search?: string;
  author?: string;
  publisher?: string;
  ordering?: string;
}
