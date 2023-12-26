import { useRefreshQuery } from "./useRefreshQuery";
import { useGetRating } from "./api/ratings/useGetRating";
import { usePutRating } from "./api/ratings/usePutRating";
import { useEffect, useState } from "react";
import { useGetAvgRatingStadium } from "./api/ratings/useGetAverageRating";

export const usePutStadiumRating = (stadiumId: string) => {
  const { refresh: refreshRatingData } = useRefreshQuery([["getStadiumRating"], ["getAvgRatingStadium"]]);
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  const handleStarPress = (selectedRating: number) => {
    setRating(selectedRating);
    putRating(selectedRating);
  };

  const {
    data: ratingInfo,
    isLoading: isLoadingRatingInfo,
    isError: isErrorRatingInfo,
    isRefetching: isRefetchingInfo,
    refetch: refetchRatingInfo,
  } = useGetRating(stadiumId);

  const {
    data: avgRatingInfo,
    isLoading: isLoadingRatingAvgInfo,
    isError: isErrorRatingAvgInfo,
    isRefetching: isRefetchingAvgInfo,
    refetch: refetchAvgIngo,
  } = useGetAvgRatingStadium(stadiumId);

  const {
    mutate: putStadiumRating,
    isLoading: isLoadingPutStadiumRating,
    isError: isErrorPutStadiumRating,
  } = usePutRating();

  const putRating = (selectedRating: number) => {
    if (selectedRating !== rating)
      putStadiumRating(
        { stadiumId, rating: selectedRating },
        {
          onSuccess: async () => {
            await refetchRatingInfo();
            refreshRatingData();
          },
        },
      );
  };

  useEffect(() => {
    if (ratingInfo) setRating(ratingInfo.rating);
    if (avgRatingInfo) setAvgRating(avgRatingInfo.avgRating);
  }, [ratingInfo, avgRatingInfo]);

  return {
    avgRating,
    rating,
    isLoading: isLoadingRatingInfo || isLoadingPutStadiumRating || isRefetchingInfo,
    isError: isErrorRatingInfo || isErrorPutStadiumRating,
    putRating,
    handleStarPress,
  };
};
