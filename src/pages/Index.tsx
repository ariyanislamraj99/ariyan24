import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import ProfileSidebar from "@/components/ProfileSidebar";
import HeroSection from "@/components/HeroSection";
import ScrollIndicator from "@/components/ScrollIndicator";
import Footer from "@/components/Footer";

// Lazy load heavy/below-fold sections
const ParticleBackground = lazy(() => import("@/components/ParticleBackground"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const ScrollToTop = lazy(() => import("@/components/ScrollToTop"));

const SectionFallback = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ScrollIndicator />
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      <ProfileSidebar />

      <div className="lg:ml-[320px] pb-16 md:pb-0">
        <Navbar />
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ExperienceSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <PortfolioSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <BlogSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
        <Footer />
      </div>

      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </div>
  );
};

export default Index;
