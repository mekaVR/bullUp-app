import { useMutation } from "@tanstack/react-query";
import { DeleteAccountRequest } from "@/services/user/user.interfaces";
import { userServices } from "@/services/user/user.services";
import { useSession } from "@/contexts/AuthContext";
import ToastComponent from "@/components/ToastComponent";
import { useToast } from "@/components/ui/toast";
import { AxiosError } from "axios";
import { ApiError } from "@/services/api/api.interfaces";

export default function useDeleteAccount() {
  const toast = useToast();
  const { setSession } = useSession();
  return useMutation({
    mutationKey: ["delete account"],
    mutationFn: (password: DeleteAccountRequest) =>
      userServices.deleteAccount(password),
    onSuccess: (data) => {
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
      setSession(null);
    },
    onError: (error: AxiosError<ApiError>) =>
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
      }),
  });
}
