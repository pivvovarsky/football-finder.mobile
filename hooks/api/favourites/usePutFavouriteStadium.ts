import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/API";

export interface FavouriteData {
  liked: boolean;
}

const putFavouriteStadium = async (uid: string) => {
  const url = `/users/me/favourite-stadiums/${uid}`;
  const { data } = await api.put<FavouriteData>(url);
  return data;
};

export function usePutFavouriteStadium() {
  return useMutation(putFavouriteStadium);
}
