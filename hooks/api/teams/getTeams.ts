import { useQuery } from "@tanstack/react-query";
import { ListResponseData } from "../../../constants/Types";
import { api } from "../../../services/API";
import { StadiumData } from "../stadiums/getStadiums";

export interface TeamData {
  id: string;
  name: string;
  imageUrl?: string;
  league: string;
  country: string;
}

const getTeams = async () => {
  const url = "/teams";
  const { data } = await api.get<unknown, ListResponseData<TeamData>>(url);
  return data;
};

export function useGetTeams() {
  return useQuery(["getTeams"], () => getTeams());
}
