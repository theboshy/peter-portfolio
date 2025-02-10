import Header from '#components/Header';
import Hero from '#components/Hero';
import AboutSection from '#components/AboutSection';
import ExpertiseSection from '#components/ExpertiseSection';
import HorizontalTimeline from '#components/HorizontalTimeline';
import ProjectsSection from '#components/ProjectsSection';
import ContactSection from '#components/ContactSection';
import CommandConsole from '#components/CommandConsole';
import Footer from '#components/Footer';
import { useTheme } from './hooks/useTheme';

function App() {
  const { isDark, setIsDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-space-black' : 'bg-white'} transition-colors duration-300`}>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <main className="overflow-hidden">
        <Hero isDark={isDark} />
        <AboutSection />
        <ExpertiseSection />
        <HorizontalTimeline />
        <ProjectsSection />
        <ContactSection />
      </main>
      <CommandConsole />
      <Footer />
    </div>
  );
}

export default App;