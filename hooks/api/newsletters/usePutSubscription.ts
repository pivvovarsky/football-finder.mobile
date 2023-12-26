import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/API";

export interface SubscribeNewsletterEntry {
  newsletterSubscribed: boolean;
}

const putSubscriptionNewsletter = async ({ newsletterSubscribed }: SubscribeNewsletterEntry) => {
  const url = "/newsletters/me/subscription";
  const { data } = await api.put<SubscribeNewsletterEntry, unknown>(url, { newsletterSubscribed });
  return data;
};

export function usePutSubscriptionNewsletter() {
  return useMutation(putSubscriptionNewsletter);
}
