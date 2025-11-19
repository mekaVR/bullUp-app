import { useMutation } from "@tanstack/react-query";
import { authenticationService } from "@/services";
import { AxiosError } from "axios";
import { ApiError } from "@/services/api/api.interfaces";
import { useSession } from "@/contexts/AuthContext";

export default function useRegister() {
  const { setSession } = useSession();

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
    onError: (error: AxiosError<ApiError>) => error,
  });
}
