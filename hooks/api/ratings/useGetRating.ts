import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/API";

export interface RatingData {
  id: string;
  stadiumId: string;
  rating: number;
}

const getStadiumRating = async (stadiumId: string) => {
  const url = `/ratings/me/${stadiumId}`;
  const { data } = await api.get<unknown, RatingData>(url);
  return data;
};

export function useGetRating(stadiumId: string) {
  return useQuery(["getStadiumRating", stadiumId], () => getStadiumRating(stadiumId), { enabled: !!stadiumId });
}
