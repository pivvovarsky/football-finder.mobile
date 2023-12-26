import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { StadiumData, useGetStadiums } from "../hooks/api/stadiums/getStadiums";
import Geolocation from "@react-native-community/geolocation";

interface ContextProps {
  stadiumsData: StadiumData[];
  locationDetails: StadiumData | null;
  isLoadingStadiumsData: boolean;
  updateLocationDetails: (stadium: StadiumData | null) => void;
}
export const MapContext = createContext<ContextProps | null>(null);

export function MapProvider({ children }: React.PropsWithChildren<unknown>) {
  const { data: stadiums, isLoading } = useGetStadiums();
  const [stadiumsData, setStadiumsData] = useState<StadiumData[]>([]);
  const [locationDetails, setLocationDetails] = useState<StadiumData | null>(null);

  const updateLocationDetails = (stadium: StadiumData | null) => {
    if (!stadium) {
      setLocationDetails(null);
    } else setLocationDetails(stadium);
  };

  useEffect(() => {
    if (!!stadiums?.data) {
      setStadiumsData(stadiums.data);
    }
  }, [stadiums?.data]);

  const mapContext = useMemo(
    () => ({ stadiumsData, locationDetails, isLoadingStadiumsData: isLoading, updateLocationDetails }),
    [stadiumsData, locationDetails, isLoading, updateLocationDetails],
  );

  return <MapContext.Provider value={mapContext}>{children}</MapContext.Provider>;
}
