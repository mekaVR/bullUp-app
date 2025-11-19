import { useMutation } from "@tanstack/react-query";
import { authenticationService } from "@/services";
import { AxiosError } from "axios";
import { ApiError } from "@/services/api/api.interfaces";
import { useSession } from "@/contexts/AuthContext";

export default function useLogin() {
  const { setSession } = useSession();
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
    onError: (error: AxiosError<ApiError>) => error,
  });
}
