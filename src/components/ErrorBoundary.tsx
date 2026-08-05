import React from 'react';

interface State {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { error: null, errorInfo: null };

  static getDerivedStateFromError(error: Error): State {
    return { error, errorInfo: null };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
    this.setState({ error, errorInfo: info });
  }

  handleReset = () => {
    this.setState({ error: null, errorInfo: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div
          role="alert"
          className="flex min-h-screen flex-col items-center justify-center bg-[#f4eee8] p-8 font-mono text-[#050505]"
        >
          <div className="w-full max-w-md border-2 border-[#050505] bg-[#f1d8ca] p-8 shadow-[6px_6px_0_#050505]">
            <h1 className="font-bangers text-6xl uppercase leading-none tracking-[0.01em]">
              Render Fault
            </h1>
            <p className="mb-4 mt-4 text-sm font-bold leading-relaxed">
              A render error interrupted the portfolio view.
            </p>
            <details className="mb-5 text-left">
              <summary className="mb-2 cursor-pointer select-none text-xs font-bold uppercase tracking-wider text-[#050505]/70">
                Error details
              </summary>
              <pre className="max-h-40 overflow-auto bg-[#050505] p-3 text-xs text-[#f1d8ca]">
                {this.state.error.message}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
            <button
              onClick={this.handleReset}
              className="bg-[#050505] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#fffaf4]"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
