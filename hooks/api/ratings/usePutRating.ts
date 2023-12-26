import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/API";

export interface RatingsData {
  stadiumId: string;
  rating: number;
}

const putRating = async ({ stadiumId, rating }: RatingsData) => {
  const url = `/ratings/me/${stadiumId}`;
  const { data } = await api.put<RatingsData, unknown>(url, { rating });
  return data;
};

export function usePutRating() {
  return useMutation(putRating);
}
