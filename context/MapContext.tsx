import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { StadiumData, useGetStadiums } from "../hooks/api/stadiums/getStadiums";
import Geolocation from "@react-native-community/geolocation";

interface ContextProps {
  stadiumsData: StadiumData[];
  isLoadingStadiumsData: boolean;
}
export const MapContext = createContext<ContextProps | null>(null);

export function MapProvider({ children }: React.PropsWithChildren<unknown>) {
  const { data: stadiums, isLoading } = useGetStadiums();
  const [stadiumsData, setStadiumsData] = useState<StadiumData[]>([]);

  useEffect(() => {
    if (!!stadiums?.data) {
      setStadiumsData(stadiums.data);
    }
  }, [stadiums?.data]);

  const mapContext = useMemo(() => ({ stadiumsData, isLoadingStadiumsData: isLoading }), [stadiumsData, isLoading]);

  return <MapContext.Provider value={mapContext}>{children}</MapContext.Provider>;
}
