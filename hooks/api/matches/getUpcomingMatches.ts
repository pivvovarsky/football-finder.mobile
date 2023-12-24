import { useQuery } from "@tanstack/react-query";
import { ListResponseData } from "../../../constants/Types";
import { api } from "../../../services/API";
import { TeamDetails } from "./getMatches";

export interface MatchData {
  id: string;
  hostGoals: number;
  guestGoals: number;
  date: Date;
  guest: TeamDetails;
  host: TeamDetails;
}

const getUpcomingMatches = async () => {
  const url = "/matches/upcoming";
  const { data } = await api.get<unknown, ListResponseData<MatchData>>(url);
  return data;
};

export function useGetUpcomingMatches() {
  return useQuery(["getUpcomingMatches"], () => getUpcomingMatches());
}
