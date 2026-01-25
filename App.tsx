
import React, { useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Stack from './components/Stack';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import { motion, useScroll, useSpring } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const dot = document.getElementById('custom-cursor');
    const ring = document.getElementById('cursor-follower');
    
    const updatePosition = (x: number, y: number) => {
      if (dot && ring) {
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        ring.style.left = `${x}px`;
        ring.style.top = `${y}px`;
      }
    };

    const onMouseMove = (e: MouseEvent) => updatePosition(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => updatePosition(e.touches[0].clientX, e.touches[0].clientY);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchstart', onTouchMove);
    
    const updateInteractivity = () => {
      const interactives = document.querySelectorAll('a, button, .interactive');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        // Touch feedback
        el.addEventListener('touchstart', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('touchend', () => document.body.classList.remove('cursor-hover'));
      });
    };

    updateInteractivity();
    const observer = new MutationObserver(updateInteractivity);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-[#d4ff00] selection:text-black bg-[#050505]">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[4px] bg-[#d4ff00] z-[100] origin-left shadow-[0_0_15px_rgba(212,255,0,0.5)]"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Stack />
        <Contact />
      </main>

      <footer className="pt-40 pb-20 px-6 lg:px-20 bg-[#050505] flex flex-col gap-20">
        <div className="w-full h-px bg-white/10"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
           <div className="flex flex-col gap-6">
              <span className="font-jakarta text-2xl font-black uppercase text-white">MUH4RHQ</span>
              <p className="text-white/40 max-w-xs font-medium">Crafting digital experiences & intelligent bots. Specialized in API Development and Automation.</p>
           </div>
           
           <div className="flex flex-col gap-6">
              <span className="text-[10px] uppercase font-black tracking-widest text-[#d4ff00]">Navigation</span>
              <nav className="flex flex-col gap-3 font-bold uppercase text-sm">
                 <a href="#about" className="hover:text-[#d4ff00] transition-colors interactive">About</a>
                 <a href="#stack" className="hover:text-[#d4ff00] transition-colors interactive">Stack</a>
                 <a href="#contact" className="hover:text-[#d4ff00] transition-colors interactive">Contact</a>
              </nav>
           </div>

           <div className="flex flex-col gap-6 md:items-end">
              <span className="text-[10px] uppercase font-black tracking-widest text-[#d4ff00]">Connect</span>
              <div className="flex gap-6">
                 <a href="https://github.com/Har404-err" target="_blank" className="font-bold text-white hover:text-[#d4ff00] transition-colors interactive uppercase">Github</a>
                 <a href="https://wa.me/6282148570591" target="_blank" className="font-bold text-white hover:text-[#d4ff00] transition-colors interactive uppercase">Whatsapp</a>
              </div>
           </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-10 opacity-20">
          <span className="text-[10px] uppercase tracking-[0.6em] font-black">© {new Date().getFullYear()} MUH4RHQ PORTFOLIO</span>
          <span className="text-[10px] uppercase tracking-[0.6em] font-black">BUILT WITH SPEED</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
