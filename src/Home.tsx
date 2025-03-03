import Header from "#components/Header";
import Hero from "#components/Hero";
import ExpertiseSection from "#components/ExpertiseSection";
import HorizontalTimeline from "#components/HorizontalTimeline";
import ContactSection from "#components/ContactSection";
import CommandConsole from "#components/CommandConsole";
import Footer from "#components/Footer";
import { useTheme } from "./hooks/useTheme";
import ErrorBoundaryProvider from "#providers/ErrorBoundaryProvider";

function Home() {
  const { isDark, setIsDark } = useTheme();

  return (
    <ErrorBoundaryProvider>
      <div
        className={`min-h-screen ${isDark ? "bg-space-black" : "bg-white"} transition-colors duration-300`}
      >
        <Header isDark={isDark} setIsDark={setIsDark} />
        <main className="overflow-hidden">
          <Hero isDark={isDark} />
          <ExpertiseSection />
          <HorizontalTimeline />
          <ContactSection />
        </main>
        <CommandConsole />
        <Footer />
      </div>
    </ErrorBoundaryProvider>
  );
}

export default Home;
