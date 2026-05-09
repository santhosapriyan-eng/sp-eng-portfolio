import Loader from '@/components/ui/Loader';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Navbar from '@/components/ui/Navbar';
import SocialDock from '@/components/ui/SocialDock';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import GitHubSection from '@/components/sections/GitHubSection';
import TerminalSection from '@/components/sections/TerminalSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FunFactsSection from '@/components/sections/FunFactsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <SocialDock />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <AchievementsSection />
        <GitHubSection />
        <TerminalSection />
        <ServicesSection />
        <FunFactsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
