import { useMemo } from "react";
import { useRefreshQuery } from "./useRefreshQuery";
import { useGetFavouriteStadium } from "./api/favourites/useGetFavouriteStadium";
import { usePutFavouriteStadium } from "./api/favourites/usePutFavouriteStadium";

export const useLikeStadium = (stadiumId: string) => {
  const { refresh: refreshFavouriteStadiums } = useRefreshQuery([["getFavouriteStadiums", { id: stadiumId }]]);
  const {
    data: favouriteInfo,
    isLoading: isLoadingFavouriteInfo,
    isError: isErrorFavouriteInfo,
    isRefetching: isFetchingFavouriteInfo,
    refetch: refetchFavouriteInfo,
  } = useGetFavouriteStadium(stadiumId);

  const {
    mutate: putLikeStadium,
    isLoading: isLoadingPutLikeStadium,
    isError: isErrorPutLikeStadium,
  } = usePutFavouriteStadium();

  const likeStadium = () => {
    putLikeStadium(stadiumId, {
      onSuccess: async () => {
        await refetchFavouriteInfo();
        refreshFavouriteStadiums();
      },
    });
  };

  const heartIcon = useMemo(() => (favouriteInfo?.liked ? "cards-heart" : "cards-heart-outline"), [favouriteInfo]);

  return {
    icon: heartIcon,
    isLoading: isLoadingFavouriteInfo || isLoadingPutLikeStadium || isFetchingFavouriteInfo,
    isError: isErrorFavouriteInfo || isErrorPutLikeStadium,
    like: likeStadium,
  };
};
