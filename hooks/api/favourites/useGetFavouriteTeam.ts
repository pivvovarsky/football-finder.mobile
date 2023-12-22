import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/API";
import { FavouriteData } from "./usePutFavouriteStadium";

const getFavouriteTeam = async (id: string) => {
  const url = `/users/me/favourite-teams/${id}`;
  const { data } = await api.get<unknown, FavouriteData>(url);
  return data;
};

export function useGetFavouriteTeam(id: string) {
  return useQuery(["getFavouriteTeam", id], () => getFavouriteTeam(id), { enabled: !!id });
}
