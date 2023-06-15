import React from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

import HelloWorld from '../components/HelloWorld';

const App = () => {
  return (
    <CssVarsProvider>
      <CssBaseline />
      
      <HelloWorld />
    </CssVarsProvider>
  );
};

export default App;
