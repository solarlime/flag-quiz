/* eslint-disable mobx/missing-observer */
import { Component, type ReactNode } from 'react';
import CoreButton from '../generic/CoreButton.tsx';
import SectionTitle from '../sections/SectionTitle.tsx';
import { ErrorDescription, ErrorMessage } from './errorStyles.ts';

interface Props {
  children: ReactNode;
  setRetryNumber: (arg: ((i: number) => number) | number) => void;
}

interface State {
  error: null | Error;
}

export default class ErrorBoundary extends Component<Props, State> {
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
          <SectionTitle title="Oops!">
            <CoreButton onClick={() => this.retry()}>Try to reload</CoreButton>
          </SectionTitle>
          <ErrorDescription>
            <p>Component was not loaded 😟</p>
            <ErrorMessage>{error.message}</ErrorMessage>
          </ErrorDescription>
        </>
      );
    }

    return this.props.children;
  }
}
