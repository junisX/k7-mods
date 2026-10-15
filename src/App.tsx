import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950">
      <a
        href="#projekte"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-grass focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-950"
      >
        Zu den Downloads springen
      </a>

      <Header />
      <main id="inhalt">
        <Hero />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
