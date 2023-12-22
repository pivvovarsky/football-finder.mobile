import { useQuery } from "@tanstack/react-query";
import { ListResponseData } from "../../../constants/Types";
import { api } from "../../../services/API";
import { TeamData } from "../teams/getTeams";
import { StadiumData } from "../stadiums/getStadiums";

interface TeamDetails {
  name: string;
  imageUrl: string;
  stadium: { name: string; websiteUrl: string };
  league: string;
  country: string;
}
export interface MatchData {
  id: string;
  hostGoals: number;
  guestGoals: number;
  date: Date;
  guest: TeamDetails;
  host: TeamDetails;
}

const getMatches = async () => {
  const url = "/matches";
  const { data } = await api.get<unknown, ListResponseData<MatchData>>(url);
  return data;
};

export function useGetMatches() {
  return useQuery(["getMatches"], () => getMatches());
}
