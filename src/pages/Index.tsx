import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import ProfileSidebar from "@/components/ProfileSidebar";

const ParticleBackground = lazy(() => import("@/components/ParticleBackground"));
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollIndicator from "@/components/ScrollIndicator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ScrollIndicator />

      {/* Sidebar - hidden on mobile, fixed on desktop */}
      <ProfileSidebar />

      {/* Main content area */}
      <div className="lg:ml-[320px] pb-16 md:pb-0">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <PortfolioSection />
        <BlogSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>

      <ScrollToTop />
    </div>
  );
};

export default Index;
