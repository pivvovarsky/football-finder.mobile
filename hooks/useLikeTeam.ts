import { useMemo } from "react";
import { useRefreshQuery } from "./useRefreshQuery";
import { useGetFavouriteTeam } from "./api/favourites/useGetFavouriteTeam";
import { usePutFavouriteTeam } from "./api/favourites/usePutFavouriteTeam";

export const useLikeTeam = (teamId: string) => {
  const { refresh: refreshFavouriteTeams } = useRefreshQuery([["getFavouriteTeams"]]);
  const { refresh: refreshFavouriteUpcomingMatches } = useRefreshQuery([["getUpcomingMatches"]]);
  const {
    data: favouriteInfo,
    isLoading: isLoadingFavouriteInfo,
    isError: isErrorFavouriteInfo,
    isRefetching: isFetchingFavouriteInfo,
    refetch: refetchFavouriteInfo,
  } = useGetFavouriteTeam(teamId);

  const { mutate: putLikeTeam, isLoading: isLoadingPutLikeTeam, isError: isErrorPutLikeTeam } = usePutFavouriteTeam();

  const likeTeam = () => {
    putLikeTeam(teamId, {
      onSuccess: async () => {
        await refetchFavouriteInfo();
        refreshFavouriteUpcomingMatches();
        refreshFavouriteTeams();
      },
    });
  };

  const heartIcon = useMemo(() => (favouriteInfo?.liked ? "cards-heart" : "cards-heart-outline"), [favouriteInfo]);

  return {
    icon: heartIcon,
    isLoading: isLoadingFavouriteInfo || isLoadingPutLikeTeam || isFetchingFavouriteInfo,
    isError: isErrorFavouriteInfo || isErrorPutLikeTeam,
    like: likeTeam,
  };
};
