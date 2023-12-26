import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/API";
import { MatchData } from "../matches/getMatches";

const getNextMatch = async (stadiumId: string) => {
  const url = `/stadiums/${stadiumId}/next-match`;
  const { data } = await api.get<unknown, MatchData>(url);
  return data;
};

export function useGetNextMatch(stadiumId: string) {
  return useQuery(["getNextMatch", stadiumId], () => getNextMatch(stadiumId), { enabled: !!stadiumId });
}
