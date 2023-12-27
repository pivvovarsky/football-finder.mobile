import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useNetworkConnection = () => {
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable !== false);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  return { isOffline };
};
