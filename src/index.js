import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { ThemeProvider } from 'styled-components';
import { chakraThemePallets, theme } from 'theme';
import { GlobalStyle } from 'GlobalStyle';
import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider theme={chakraThemePallets}>
            <BrowserRouter basename="goit-react-hw-08-phonebook">
              <App />
              <GlobalStyle />
            </BrowserRouter>
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
