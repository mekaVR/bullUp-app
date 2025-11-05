import { useMutation } from "@tanstack/react-query";
import AuthenticationService from "@/app/authentication/services/authentication.service";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { ApiErrorDetail } from "@/app/authentication/services/authentication.interfaces";

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
        pathname: "/authentication/screens/register",
        params: { username },
      });
    },
    onError: (error: AxiosError<ApiErrorDetail>) => error,
  });
}
