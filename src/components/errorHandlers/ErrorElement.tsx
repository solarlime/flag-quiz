/* eslint-disable mobx/missing-observer */
import { isRouteErrorResponse, useRouteError } from 'react-router';
import SectionTitle from '../sections/SectionTitle.tsx';
import { ErrorDescription, ErrorMessage } from './errorStyles.ts';

export function ErrorElement() {
  const error = useRouteError();
  console.log(error);
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorDescription>
        <SectionTitle title={`${error.status} ${error.statusText}`} />
        <ErrorMessage>{error.data}</ErrorMessage>
      </ErrorDescription>
    );
  } else if (error instanceof Error) {
    return (
      <ErrorDescription>
        <SectionTitle title="Error" />
        <ErrorMessage>{error.message}</ErrorMessage>
        <p>The stack trace is:</p>
        <ErrorMessage>{error.stack}</ErrorMessage>
      </ErrorDescription>
    );
  } else {
    return (
      <ErrorDescription>
        <SectionTitle title="Unknown Error" />
        <p>Check the developer console for details</p>
      </ErrorDescription>
    );
  }
}

export default ErrorElement;
