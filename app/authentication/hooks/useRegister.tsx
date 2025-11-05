import { useMutation } from "@tanstack/react-query";
import { authenticationService } from "@/services";
import { AxiosError } from "axios";
import { ApiErrorDetail } from "@/app/authentication/services/authentication.interfaces";

export default function useRegister(
  setSession: (value: string | null) => void,
) {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: ({
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    }) => authenticationService.register(username, email, password),
    onSuccess: (data) => setSession(JSON.stringify(data)),
    onError: (error: AxiosError<ApiErrorDetail>) => error,
  });
}
