import { cn } from "@/lib/utils";
import { recoverFromStaleChunk } from "@/lib/chunkRecovery";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (recoverFromStaleChunk(error)) return;
    console.error('[PFS page error]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-background">
          <div className="flex flex-col items-center w-full max-w-2xl p-8">
            <img
              src="/images/brands/pfs-logo-wide.png"
              alt="PFS Filters"
              className="h-14 w-auto object-contain mb-8"
            />
            <AlertTriangle
              size={48}
              className="text-destructive mb-6 flex-shrink-0"
            />

            <h2 className="text-xl font-semibold mb-3">This page needs a quick refresh.</h2>
            <p className="text-muted-foreground text-center mb-6">
              Your shopping information is still safe. Refresh the page to continue.
            </p>

            <button
              onClick={() => window.location.reload()}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border border-transparent",
                "bg-primary text-primary-foreground",
                "hover:opacity-90 hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-[0_20px_70px_-12px_rgba(59,130,246,0.75)] cursor-pointer transition-[transform,box-shadow,background-color,border-color] duration-200"
              )}
            >
              <RotateCcw size={16} />
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
