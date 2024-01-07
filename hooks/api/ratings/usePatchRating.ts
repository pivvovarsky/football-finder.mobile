import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/API";

export interface RatingsData {
  stadiumId: string;
  rating: number;
}

const patchRating = async ({ stadiumId, rating }: RatingsData) => {
  const url = `/ratings/me/${stadiumId}`;
  const { data } = await api.patch<RatingsData, unknown>(url, { rating });
  return data;
};

export function usePatchRating() {
  return useMutation(patchRating);
}
