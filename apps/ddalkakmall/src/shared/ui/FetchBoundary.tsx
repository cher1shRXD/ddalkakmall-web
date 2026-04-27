"use client";

import { ErrorBoundary } from "react-error-boundary";
import { ReactNode, Suspense } from "react";

interface Props {
  onPending: ReactNode;
  onError: ReactNode;
  children: ReactNode;
}

const FetchBoundary = ({ onPending, onError, children }: Props) => {
  return (
    <ErrorBoundary fallback={onError}>
      <Suspense fallback={onPending}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default FetchBoundary;