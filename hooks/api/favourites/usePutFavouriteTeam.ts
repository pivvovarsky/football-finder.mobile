import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/API";
import { FavouriteData } from "./usePutFavouriteStadium";

const putFavouriteTeam = async (uid: string) => {
  const url = `/users/me/favourite-teams/${uid}`;
  const { data } = await api.put<FavouriteData>(url);
  return data;
};

export function usePutFavouriteTeam() {
  return useMutation(putFavouriteTeam);
}
