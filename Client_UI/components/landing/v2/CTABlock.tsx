"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button, Container } from "@/components/atoms";

export default function CTABlock() {
  return (
    <section className="py-16 bg-background">
      <Container>
        <div className="bg-gradient-to-br from-secondary to-secondary-dark rounded-3xl p-12 md:p-16 text-center shadow-xl shadow-orange-500/20 border border-orange-400">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight-v2">
            Ready to practice?
          </h2>
          <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto font-medium">
            Join 200+ students who stopped guessing and started practicing.
          </p>
          <Button
            asChild
            variant="secondary"
            size="xl"
            rounded="full"
            className="shadow-lg"
            rightIcon={<ChevronRight className="w-5 h-5" />}
          >
            <Link href="/auth/sign-up">Get Started Free</Link>
          </Button>
          <p className="text-sm text-orange-100 mt-4 font-medium">
            No credit card required • Free to sign up
          </p>
        </div>
      </Container>
    </section>
  );
}
