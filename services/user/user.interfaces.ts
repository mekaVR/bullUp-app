export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  bio: string | null;
}

export interface UserProfile extends User {
  collection: UserCollection[];
  wishlist: UserWishlist[];
  reviews: Review[];
  loans: Loan[];
  follows: FollowedUser[];
  authors_follow: AuthorFollow[];
  publisher_follow: PublisherFollow[];
  total_collection: number;
  total_wishlist: number;
  total_reviews: number;
}

export interface UserCollection {
  comic_book: number;
  comic_book_title: string;
  comic_book_id: number;
}

export interface UserWishlist {
  comic_book: number;
  comic_book_title: string;
  comic_book_id: number;
}

export interface FollowedUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
}

export interface Review {
  id: number;
}

export interface Loan {
  id: number;
}

export interface AuthorFollow {
  id: number;
}

export interface PublisherFollow {
  id: number;
}

export interface UpdateProfileRequest {
  email?: string;
  avatar?: string | null;
  bio?: string | null;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export type GetProfileResponse = UserProfile;

export interface UpdateProfileResponse {
  message: string;
  user: UserProfile;
}

export interface ChangePasswordResponse {
  message: string;
}
