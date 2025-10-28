/* eslint-disable mobx/missing-observer */
import { Suspense, lazy, useMemo, useState, MemoExoticComponent } from 'react';
import ErrorBoundary from './components/errorHandlers/ErrorBoundary.tsx';

export default function withLazy(componentPath: string) {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cachedComponent: null | { default: MemoExoticComponent<any> } = null;
  return function LazyWrapper() {
    const [retryNumber, setRetryNumber] = useState(0);

    const LazyComponent = useMemo(() => {
      return lazy(() => {
        if (cachedComponent) return Promise.resolve(cachedComponent);
        return import(
          /* @vite-ignore */
          `${componentPath}?t=${retryNumber}`
        ).then((res) => {
          cachedComponent = res;
          return res;
        });
      });
    }, [retryNumber]);

    return (
      <Suspense key={retryNumber} fallback={<div>Loading...</div>}>
        <ErrorBoundary key={retryNumber} setRetryNumber={setRetryNumber}>
          <LazyComponent key={retryNumber} />
        </ErrorBoundary>
      </Suspense>
    );
  };
}
