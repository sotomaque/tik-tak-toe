import React, { ReactElement, ReactNode } from 'react';
import {
  useFonts,
  DeliusUnicase_400Regular,
  DeliusUnicase_700Bold,
} from '@expo-google-fonts/delius-unicase';
import AppLoading from 'expo-app-loading';

type AppBoostrapProps = {
  children: ReactNode;
};

const AppBoostrap = ({ children }: AppBoostrapProps): ReactElement => {
  const [fontLoaded] = useFonts({
    DeliusUnicase_400Regular,
    DeliusUnicase_700Bold,
  });
  if (!fontLoaded) return <AppLoading />;

  return fontLoaded ? <>{children}</> : <AppLoading />;
};

export default AppBoostrap;
