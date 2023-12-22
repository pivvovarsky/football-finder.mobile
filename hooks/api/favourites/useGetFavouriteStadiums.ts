import { useQuery } from "@tanstack/react-query";
import { ListResponseData } from "../../../constants/Types";
import { api } from "../../../services/API";
import { StadiumData } from "../stadiums/getStadiums";

const getFavouriteStadiums = async () => {
  const url = "users/me/favourite-stadiums";
  const { data } = await api.get<unknown, ListResponseData<StadiumData>>(url);
  return data;
};
export function useGetFavouriteStadiums() {
  return useQuery(["getFavouriteStadiums"], () => getFavouriteStadiums());
}
