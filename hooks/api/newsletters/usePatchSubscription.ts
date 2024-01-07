import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/API";

export interface SubscribeNewsletterEntry {
  newsletterSubscribed: boolean;
}

const patchSubscriptionNewsletter = async ({ newsletterSubscribed }: SubscribeNewsletterEntry) => {
  const url = "/newsletters/me/subscription";
  const { data } = await api.patch<SubscribeNewsletterEntry, unknown>(url, { newsletterSubscribed });
  return data;
};

export function usePatchSubscriptionNewsletter() {
  return useMutation(patchSubscriptionNewsletter);
}
