import { useMutation } from "@tanstack/react-query";
import AuthenticationService from "@/services/authentication/authentication.service";
import { AxiosError } from "axios";
import { ApiErrorDetail } from "@/services/authentication/authentication.interfaces";

export default function useRequestPasswordReset() {
  return useMutation({
    mutationKey: ["request password reset"],
    mutationFn: ({ email }: { email: string }) =>
      AuthenticationService.requestPasswordReset(email),
    onSuccess: (data) => data,
    onError: (error: AxiosError<ApiErrorDetail>) => error,
  });
}
