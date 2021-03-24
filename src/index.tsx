import React, { ReactElement } from 'react';

import { AppBoostrap } from '@components';
import Navigator from '@config/navigator';
import { SettingsProvider } from '@context/settings-context';

import Amplify from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

function App(): ReactElement {
  return (
    <AppBoostrap>
      <SettingsProvider>
        <Navigator />
      </SettingsProvider>
    </AppBoostrap>
  );
}

export default App;
