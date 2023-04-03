import React from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

import Welcome from '../components/HelloWorld';

const App = () => {
  return (
    <CssVarsProvider>
      <CssBaseline />
      
      <Welcome />
    </CssVarsProvider>
  );
};

export default App;
