import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userServices } from "@/services/user/user.services";
import {
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "@/services/user/user.interfaces";
import { AxiosError } from "axios";
import { useSession } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/toast";
import ToastComponent from "@/components/ToastComponent";
import { ApiError } from "@/services/api/api.interfaces";
import { API_DEFAULT_ERROR_MESSAGE } from "@/constants/api";

export default function useUpdateProfile() {
  const toast = useToast();
  const { session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (user: UpdateProfileRequest) =>
      userServices.updateProfile(user),
    onSuccess: (data: UpdateProfileResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["get user profile", session],
      });
      toast.show({
        placement: "top",
        duration: 3000,
        render: ({ id }) => (
          <ToastComponent
            id={id}
            message={data.message}
            action={"success"}
            variant={"solid"}
          />
        ),
      });
    },
    onError: (error: AxiosError<ApiError>) =>
      toast.show({
        placement: "top",
        duration: 3000,
        render: ({ id }) => (
          <ToastComponent
            id={id}
            message={error.response?.data?.message ?? API_DEFAULT_ERROR_MESSAGE}
            action={"error"}
            variant={"solid"}
          />
        ),
      }),
  });
}
