"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button, Container } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <Container size="sm" className="text-center py-16">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="text-[100px] md:text-[140px] font-bold text-error/10 leading-none select-none">
            500
          </div>
          <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto -mt-14 relative">
            <AlertTriangle className="w-10 h-10 text-error" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
          Something went wrong
        </h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          We encountered an unexpected error. Don&apos;t worry, our team has been
          notified and we&apos;re working on it.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button
            variant="primary"
            onClick={reset}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Try Again
          </Button>
          <Button asChild variant="outline" leftIcon={<Home className="w-4 h-4" />}>
            <Link href={ROUTES.home}>Go Home</Link>
          </Button>
        </div>

        {/* Error details (only in development) */}
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mt-8 p-4 bg-background-subtle rounded-lg text-left">
            <p className="text-xs font-mono text-text-tertiary break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs font-mono text-text-tertiary mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}
      </Container>
    </main>
  );
}
