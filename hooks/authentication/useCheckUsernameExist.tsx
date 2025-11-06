import { useMutation } from "@tanstack/react-query";
import AuthenticationService from "@/services/authentication/authentication.service";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { ApiErrorDetail } from "@/services/authentication/authentication.interfaces";

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
    onError: (error: AxiosError<ApiErrorDetail>) => error,
  });
}
