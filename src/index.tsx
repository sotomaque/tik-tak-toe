import React, { ReactElement } from 'react';

import { AppBoostrap } from '@components';
import Navigator from '@config/navigator';

function App(): ReactElement {
  return (
    <AppBoostrap>
      <Navigator />
    </AppBoostrap>
  );
}

export default App;
