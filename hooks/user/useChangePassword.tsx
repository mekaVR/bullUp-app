import { useMutation } from "@tanstack/react-query";
import { userServices } from "@/services/user/user.services";
import { ChangePasswordRequest } from "@/services/user/user.interfaces";
import ToastComponent from "@/components/ToastComponent";
import { useToast } from "@/components/ui/toast";
import { AxiosError } from "axios";
import { ApiError } from "@/services/api/api.interfaces";

export default function useChangePassword() {
  const toast = useToast();

  return useMutation({
    mutationKey: ["change password"],
    mutationFn: (changePasswordRequest: ChangePasswordRequest) =>
      userServices.changePassword(changePasswordRequest),
    onSuccess: (data) =>
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
      }),
    onError: (error: AxiosError<ApiError>) => {
      toast.show({
        placement: "top",
        duration: 3000,
        render: ({ id }) => (
          <ToastComponent
            id={id}
            message={error.response?.data.error ?? "Une erreur est survenue"}
            action={"error"}
            variant={"solid"}
          />
        ),
      });
    },
  });
}
