import { useQuery } from "@tanstack/react-query";
import { userServices } from "@/services/user/user.services";

export default function useGetUserProfile(session: string | null) {
  return useQuery({
    queryKey: ["get user profile", session],
    queryFn: () => userServices.getMe(),
    refetchOnWindowFocus: true,
  });
}
