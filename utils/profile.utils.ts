import { UpdateProfileRequest } from "@/services/user/user.interfaces";

export const buildProfileFormData = (user: UpdateProfileRequest): FormData => {
  const formData = new FormData();

  if (user.avatar && user.avatar.startsWith("file://")) {
    formData.append("avatar", {
      uri: user.avatar,
      type: "image/jpeg",
      name: "avatar.jpg",
    } as any);
  }

  if (user.email) formData.append("email", user.email);
  if (user.bio) formData.append("bio", user.bio);

  return formData;
};
