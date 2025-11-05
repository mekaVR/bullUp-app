import { useMutation } from "@tanstack/react-query";
import { authenticationService } from "@/services";
import { AxiosError } from "axios";
import { ApiErrorDetail } from "@/app/authentication/services/authentication.interfaces";

export default function useLogin(setSession: (value: string | null) => void) {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => authenticationService.login(username, password),
    onSuccess: (data) => setSession(JSON.stringify(data)),
    onError: (error: AxiosError<ApiErrorDetail>) => error,
  });
}
