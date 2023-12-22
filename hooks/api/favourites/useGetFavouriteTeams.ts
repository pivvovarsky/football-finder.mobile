import { useQuery } from "@tanstack/react-query";
import { ListResponseData } from "../../../constants/Types";
import { api } from "../../../services/API";
import { TeamData } from "../teams/getTeams";

const getFavouriteTeams = async () => {
  const url = "users/me/favourite-teams";
  const { data } = await api.get<unknown, ListResponseData<TeamData>>(url);
  return data;
};
export function useGetFavouriteTeams() {
  return useQuery(["getFavouriteTeams"], () => getFavouriteTeams());
}
