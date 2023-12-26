import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/API";

export interface SubscriptionData {
  newsletterSubscribed: boolean;
}

const getSubscription = async () => {
  const url = "/newsletters/me/subscription";
  const { data } = await api.get<unknown, SubscriptionData>(url);
  return data;
};

export function useGetSubscription(userId: string | null) {
  return useQuery(["getSubscription"], () => getSubscription(), { enabled: !!userId });
}
