import React from 'react';
import { AppRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/joy';

const App = () => {
  return (
    <CssBaseline>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </CssBaseline>
  );
}

export default App;
