import Controls from './components/Controls';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import { Projects } from './components/Projects';
import Background from './components/Background';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <Controls />
      <Header />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Background />
        <Contact />
      </main>
    </>
  );
}
