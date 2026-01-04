import Faq from "@/components/ui/home/faq";
import {
  HeroSectionV2,
  TrustBarV2,
  ProblemSection,
  HowItWorksV2,
  CTABlock,
  FeaturedMentors,
  StatsSectionV2,
  Testimonials,
} from "@/components/landing/v2";

export default function Component() {
  return (
    <main className="flex-1">
      <HeroSectionV2 />
      <TrustBarV2 />
      <ProblemSection />
      <HowItWorksV2 />
      <CTABlock />
      <FeaturedMentors />
      <StatsSectionV2 />
      <Testimonials />
      <Faq />
    </main>
  );
}
