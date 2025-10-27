/* eslint-disable mobx/missing-observer */
import {
  Suspense,
  lazy,
  Component,
  ReactNode,
  useMemo,
  useState,
  MemoExoticComponent,
} from 'react';
import CoreButton from './components/generic/CoreButton.tsx';

interface Props {
  children: ReactNode;
  setRetryNumber: (arg: ((i: number) => number) | number) => void;
}

interface State {
  error: null | Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  retry() {
    this.props.setRetryNumber((i) => i + 1);
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <>
          <div style={{ padding: 20, textAlign: 'center', maxWidth: '600px' }}>
            <h3>Component was not loaded</h3>
            <p>{error.message}</p>
          </div>
          <CoreButton onClick={() => this.retry()}>Try to reload</CoreButton>
        </>
      );
    }

    return this.props.children;
  }
}

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
