import api from "@/services/api/axios.config";
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  GetProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "@/services/user/user.interfaces";
import { API_ENDPOINTS } from "@/constants/api";
import { buildProfileFormData } from "@/utils/profile.utils";

export const userServices = {
  getMe: async (): Promise<GetProfileResponse> => {
    const response = await api.get<GetProfileResponse>(
      API_ENDPOINTS.USER_PROFILE,
    );
    return response.data;
  },

  updateProfile: async (
    user: UpdateProfileRequest,
  ): Promise<UpdateProfileResponse> => {
    const hasFile = user.avatar && user.avatar.startsWith("file://");

    if (hasFile) {
      const formData = buildProfileFormData(user);
      const response = await api.patch<UpdateProfileResponse>(
        API_ENDPOINTS.USER_PROFILE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } else {
      const response = await api.patch<UpdateProfileResponse>(
        API_ENDPOINTS.USER_PROFILE,
        user,
      );
      return response.data;
    }
  },

  changePassword: async (
    changePasswordRequest: ChangePasswordRequest,
  ): Promise<ChangePasswordResponse> => {
    const response = await api.post<ChangePasswordResponse>(
      API_ENDPOINTS.USER_CHANGE_PASSWORD,
      changePasswordRequest,
    );
    return response.data;
  },
};
