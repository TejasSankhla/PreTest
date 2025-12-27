import Link from "next/link";
import { Button, Container } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <Container size="sm" className="text-center py-16">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-[120px] md:text-[180px] font-bold text-secondary/10 leading-none select-none">
            404
          </div>
          <div className="w-20 h-20 bg-secondary-lightest rounded-full flex items-center justify-center mx-auto -mt-16 relative">
            <Search className="w-10 h-10 text-secondary" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
          Page not found
        </h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
          moved or doesn&apos;t exist.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button asChild variant="primary" leftIcon={<Home className="w-4 h-4" />}>
            <Link href={ROUTES.home}>Go Home</Link>
          </Button>
          <Button asChild variant="outline" leftIcon={<Search className="w-4 h-4" />}>
            <Link href={ROUTES.exploreMentors}>Find Mentors</Link>
          </Button>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="text-sm text-text-tertiary hover:text-text-secondary inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Go back to previous page
          </button>
        </div>
      </Container>
    </main>
  );
}
