import { HeroSection } from "@/components/home/hero-section";
import { OutcomesSection } from "@/components/home/outcomes-section";
import { ToolsSection } from "@/components/home/tools-section";
import { RoadmapSection } from "@/components/home/roadmap-section";
import { FeaturedCoursesSection } from "@/components/home/featured-courses-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { MethodologySection } from "@/components/home/methodology-section";
import { BenefitsSection } from "@/components/home/benefits-section";
import { FaqSection } from "@/components/home/faq-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OutcomesSection />
      <ToolsSection />
      <RoadmapSection />
      <FeaturedCoursesSection />
      <ProjectsSection />
      <MethodologySection />
      <BenefitsSection />
      <FaqSection />
    </>
  );
}
