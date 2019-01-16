import React, { Component, SFC } from "react";

export interface IFallbackProps {
  componentStack: string;
  error: Error;
}

const ErrorBoundaryFallbackComponent: SFC<IFallbackProps> = ({
  error,
  componentStack,
}) => <span>ERROR:{error.message}, STACK:{componentStack} </span>;

interface IProps {
  children?: any;
  FallbackComponent: SFC<IFallbackProps>;
  onError?: (error: Error, componentStack: string) => void;
}

interface IErrorInfo {
  componentStack: string;
}

interface IState {
  error: Error | null;
  info: IErrorInfo | null;
}
const isError = (error: Error | null): error is Error => error !== null;

export class ErrorBoundary extends Component<IProps, IState> {
  public static defaultProps = {
    FallbackComponent: ErrorBoundaryFallbackComponent,
  };

  public state: IState = {
    error: null,
    info: null,
  };

  public componentDidCatch(error: Error, info: IErrorInfo): void {
    const { onError } = this.props;

    if (typeof onError === "function") {
      try {
        onError.call(this, error, info ? info.componentStack : "");
      } catch (ignoredError) {} //tslint:disable-line
    }

    this.setState({ error, info });
  }

  public render() {
    const { children, FallbackComponent } = this.props;
    const { error, info } = this.state;

    if (error) {
      return (
        <FallbackComponent
          componentStack={info ? info.componentStack : ""}
          error={error}
        />
      );
    }

    return children;
  }
}

export const withErrorBoundary = (
  Wrapped: typeof Component,
  Fallback?: SFC<IFallbackProps>,
  onError?: () => void,
) => (props: any) => (
  <ErrorBoundary FallbackComponent={Fallback} onError={onError}>
    <Wrapped {...props} />
  </ErrorBoundary>
);

export default withErrorBoundary;
