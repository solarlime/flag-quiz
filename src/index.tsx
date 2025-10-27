import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router';
import './index.css';
import App from './App.tsx';
import Store from './store/store.ts';
import { StoreProvider, useStore } from './store/StoreProvider.tsx';
import GlobalStyles from './globalStyles.ts';
import StartMenu from './components/StartMenu.tsx';
import withLazy from './WithLazy.tsx';

const store = new Store();

autorun(() => {
  localStorage.setItem('themeName', store.themeStore.theme.name);
});

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: StartMenu },
      {
        path: 'new',
        Component: withLazy('./components/sections/new/New.tsx'),
      },
      {
        path: 'quiz',
        loader: () => {
          if (!store.quizStore) {
            return redirect('/');
          }
        },
        Component: withLazy('./components/sections/quiz/Quiz.tsx'),
      },
      {
        path: 'result',
        loader: () => {
          if (!store.quizStore || !store.quizStore.questionsQuantity) {
            return redirect('/');
          }
        },
        Component: withLazy('./components/sections/result/Result.tsx'),
      },
    ],
  },
]);

const ThemedApp = observer(() => {
  const { themeStore } = useStore();

  return (
    <ThemeProvider theme={themeStore.theme}>
      <RouterProvider router={router} />
      <GlobalStyles />
    </ThemeProvider>
  );
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
