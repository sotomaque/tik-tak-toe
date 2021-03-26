import React, { ReactElement, ReactNode, useState, useEffect } from 'react';
import {
  useFonts,
  DeliusUnicase_400Regular,
  DeliusUnicase_700Bold,
} from '@expo-google-fonts/delius-unicase';
import AppLoading from 'expo-app-loading';
import { Auth, Hub } from 'aws-amplify';

import { useAuth } from '@context/auth-context';

type AppBoostrapProps = {
  children: ReactNode;
};

const AppBoostrap = ({ children }: AppBoostrapProps): ReactElement => {
  const [fontLoaded] = useFonts({
    DeliusUnicase_400Regular,
    DeliusUnicase_700Bold,
  });
  const [authLoaded, setAuthLoaded] = useState(false);
  const { setUser } = useAuth();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await Auth.currentAuthenticatedUser();
        if (res) {
          setUser(res);
        }
      } catch (error) {
        console.error('error getting current user', error);
      }
      setAuthLoaded(true);
    };

    getCurrentUser();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hubListener = (hubData: any) => {
      const { data, event } = hubData.payload;
      switch (event) {
        case 'signOut':
          setUser(null);
          break;

        case 'signIn':
          setUser(data);
          break;

        default:
          break;
      }
    };
    Hub.listen('auth', hubListener);

    return () => {
      Hub.remove('auth', hubListener);
    };
  }, []);

  if (!fontLoaded) return <AppLoading />;

  return fontLoaded && authLoaded ? <>{children}</> : <AppLoading />;
};

export default AppBoostrap;
