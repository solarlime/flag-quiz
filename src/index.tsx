import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from 'styled-components';
import Store from './store/store.ts';
import { StoreProvider, useStore } from './store/StoreProvider.tsx';
import { observer } from 'mobx-react-lite';
import GlobalStyles from './globalStyles.ts';
import { autorun } from 'mobx';

const ThemedApp = observer(() => {
  const { themeStore } = useStore();

  return (
    <ThemeProvider theme={themeStore.theme}>
      <App />
      <GlobalStyles />
    </ThemeProvider>
  );
});

const store = new Store();

autorun(() => {
  localStorage.setItem('themeName', store.themeStore.theme.name);
});

const renderApp = () =>
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <StoreProvider value={store}>
        <ThemedApp />
      </StoreProvider>
    </StrictMode>,
  );

if ('any' in Promise) {
  renderApp();
} else {
  console.info('Using polyfills');
  // @ts-ignore
  import('core-js/es/promise/any.js').then(() => renderApp());
}
