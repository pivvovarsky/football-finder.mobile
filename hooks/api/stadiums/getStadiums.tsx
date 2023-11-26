import { useQuery } from "@tanstack/react-query";
import { ListResponseData } from "../../../constants/Types";
import { api } from "../../../services/API";

export interface StadiumData {
  id: string;
  imageUrl: string | null;
  name: string;
  latitude: number;
  longitude: number;
  description: string | null;
  teamId: string;
  websiteUrl: string | null;
}

const getStadiums = async () => {
  const url = "/stadiums";
  const { data } = await api.get<unknown, ListResponseData<StadiumData>>(url);
  return data;
};

export function useGetStadiums() {
  return useQuery(["getStadiums"], () => getStadiums());
}
