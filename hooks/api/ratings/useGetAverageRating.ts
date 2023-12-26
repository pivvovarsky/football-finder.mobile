import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/API";

export interface AvgRating {
  avgRating: number;
}

const getAvgRatingStadium = async (stadiumId: string) => {
  const url = `ratings/${stadiumId}/average`;
  const { data } = await api.get<unknown, AvgRating>(url);

  return data;
};

export function useGetAvgRatingStadium(stadiumId: string) {
  return useQuery(["getAvgRatingStadium", stadiumId], () => getAvgRatingStadium(stadiumId), { enabled: !!stadiumId });
}
