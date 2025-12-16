import React from "react";
import Link from "next/link";
import { Button, Container, Logo } from "@/components/atoms";
import { ROUTES } from "@/lib/routes";
import { siteConfig } from "@/lib/config";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background">
      {/* Main Footer Content */}
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href={ROUTES.home} className="inline-block" prefetch={false}>
              <Logo variant="variant1" size="md" mode="full" />
            </Link>
            <p className="text-sm text-text-secondary max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Product
            </h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li>
                <Link
                  href={ROUTES.exploreMentors}
                  className="hover:text-text-primary transition-colors"
                >
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.anchors.howItWorks}
                  className="hover:text-text-primary transition-colors"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li>
                <Link
                  href={ROUTES.legal.privacy}
                  className="hover:text-text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.legal.terms}
                  className="hover:text-text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.legal.refunds}
                  className="hover:text-text-primary transition-colors"
                >
                  Cancellation & Refund
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Get Started
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Ready to ace your next interview?
            </p>
            <Button asChild variant="secondary" size="sm" rounded="full">
              <Link href={ROUTES.auth.signUp}>Sign Up Free</Link>
            </Button>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <Container className="py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-text-secondary">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-sm text-text-secondary">
              Made with focus on helping you succeed
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
