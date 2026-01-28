import { useEffect, useState } from 'react'
import NetInfo from "@react-native-community/netinfo";

export function useCheckInternet() {
  const [hasInternet, setHasInternet] = useState(true);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setHasInternet(!!state.isConnected);
    });
  }, []);

  return { hasInternet };
}
