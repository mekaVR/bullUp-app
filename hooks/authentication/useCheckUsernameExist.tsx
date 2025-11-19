import { useMutation } from "@tanstack/react-query";
import AuthenticationService from "@/services/authentication/authentication.service";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { ApiError } from "@/services/api/api.interfaces";

export default function useCheckUsernameExists(username: string) {
  const router = useRouter();

  return useMutation({
    mutationKey: ["check username exists"],
    mutationFn: ({ username }: { username: string }) =>
      AuthenticationService.checkUsernameExists(username),
    onSuccess: (data) => {
      if (data.exists) {
        return;
      }
      router.push({
        pathname: "/(auth)/register",
        params: { username },
      });
    },
    onError: (error: AxiosError<ApiError>) => error,
  });
}
