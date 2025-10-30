/* eslint-disable mobx/missing-observer, @typescript-eslint/no-explicit-any*/
import { Suspense, lazy, useMemo, useState, MemoExoticComponent } from 'react';
import ErrorBoundary from './components/errorHandlers/ErrorBoundary.tsx';

export default function withLazy(importModule: () => Promise<any>) {
  let cachedComponent: null | { default: MemoExoticComponent<any> } = null;
  return function LazyWrapper() {
    const [retryNumber, setRetryNumber] = useState(0);

    const LazyComponent = useMemo(() => {
      return lazy(() => {
        if (cachedComponent) return Promise.resolve(cachedComponent);
        return importModule().then((res) => {
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

// export default function withLazy(componentPath: string) {
//   const cachedRetries = {};
//   return function LazyWrapper() {
//     const [retryNumber, setRetryNumber] = useState(0);
//     console.log(cachedRetries);
//
//     const LazyComponent = useMemo(() => {
//       return lazy(() => {
//         const path = `${componentPath}?t=${cachedRetries[componentPath] ?? retryNumber}`;
//         return import(path).then((res) => {
//           console.log(retryNumber);
//           if (
//             !cachedRetries[componentPath] ||
//             retryNumber > cachedRetries[componentPath]
//           )
//             cachedRetries[componentPath] = retryNumber;
//           return res;
//         });
//       });
//     }, [retryNumber]);
//
//     return (
//       <Suspense key={retryNumber} fallback={<div>Loading...</div>}>
//         <ErrorBoundary key={retryNumber} setRetryNumber={setRetryNumber}>
//           <LazyComponent key={retryNumber} />
//         </ErrorBoundary>
//       </Suspense>
//     );
//   };
// }
