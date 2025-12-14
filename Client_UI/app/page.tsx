import Faq from "@/components/ui/home/faq";
import {
  HeroSectionV2,
  TrustBarV2,
  HowItWorksV2,
  StatsSectionV2,
} from "@/components/landing/v2";

export default function Component() {
  return (
    <main className="flex-1">
      <HeroSectionV2 />
      <TrustBarV2 />
      <HowItWorksV2 />
      <StatsSectionV2 />
      <Faq />
    </main>
  );
}
