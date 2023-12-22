import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/API";
import { FavouriteData } from "./usePutFavouriteStadium";

const getFavouriteStadium = async (id: string) => {
  const url = `/users/me/favourite-stadiums/${id}`;
  const { data } = await api.get<unknown, FavouriteData>(url);
  return data;
};

export function useGetFavouriteStadium(id: string) {
  return useQuery(["getFavouriteStadium", id], () => getFavouriteStadium(id), { enabled: !!id });
}
