import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from 'styled-components';
import Store from './store/store.ts';
import { StoreProvider, useStore } from './store/StoreProvider.tsx';
import { observer } from 'mobx-react-lite';
import GlobalStyles from './globalStyles.ts';

const ThemedApp = observer(() => {
  const { themeStore } = useStore();

  return (
    <ThemeProvider theme={themeStore.theme}>
      <App />
      <GlobalStyles />
    </ThemeProvider>
  );
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider value={new Store()}>
      <ThemedApp />
    </StoreProvider>
  </StrictMode>,
);
