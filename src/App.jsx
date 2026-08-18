import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
// Simple FPS Counter Component
function FPSCounter() {
  const [fps, setFps] = useState(0);
  const lastFrame = useRef(performance.now());
  const frameCount = useRef(0);

  useEffect(() => {
    let running = true;
    function tick() {
      if (!running) return;
      frameCount.current++;
      const now = performance.now();
      if (now - lastFrame.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastFrame.current = now;
      }
      requestAnimationFrame(tick);
    }
    tick();
    return () => { running = false; };
  }, []);

  // Bar settings
  const maxFps = 60;
  const barWidth = Math.min(fps, maxFps) / maxFps * 100;
  let barColor = '#4ade80'; // green
  if (fps < 30) barColor = '#f87171'; // red
  else if (fps < 50) barColor = '#facc15'; // yellow

  return (
    <div style={{
      position: 'fixed',
      top: 12,
      left: 12,
      background: 'rgba(30,30,30,0.85)',
      color: '#fff',
      padding: '10px 16px 14px 16px',
      borderRadius: '10px',
      fontSize: '14px',
      zIndex: 9999,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      minWidth: '120px',
      userSelect: 'none'
    }}>
      <div style={{marginBottom: '4px', fontWeight: 'bold'}}>FPS: {fps}</div>
      <div style={{
        width: '100%',
        height: '12px',
        background: '#222',
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 2px #0002'
      }}>
        <div style={{
          width: `${barWidth}%`,
          height: '100%',
          background: barColor,
          transition: 'width 0.2s, background 0.2s'
        }} />
      </div>
    </div>
  );
}
// import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/ui/NavBar";
import Hero from "./components/homepage/Hero";
import Role from "./components/homepage/Role";
import About from "./components/homepage/About";
import Services from "./components/homepage/Services";
import Works from "./components/homepage/Works";
import Contact from "./components/homepage/Contact";
import Footer from "./components/ui/Footer";
import { Analytics } from "@vercel/analytics/react"


function App() {

  gsap.registerPlugin(ScrollTrigger);

  const sectionRefs = useRef([]); // Creating a sectionRefs array


  // Scrub animation of section headings
  useEffect(() => {
    //TODO Learn useContext and useRef here
    const sectionHeadings = document.querySelectorAll(".section-heading");
    sectionHeadings.forEach((heading) => {
      const headings = heading.querySelectorAll(".heading");

      headings.forEach((individualHeading) => {
        ScrollTrigger.create({
          trigger: heading,
          start: "top 550px",
          end: "bottom 550px",
          animation: gsap.to(individualHeading, {
            opacity: 1,
            y: 0,
            ease: "power4.out",
            duration: 1,
          }),
          toggleActions: "play none none none",
        });
        ScrollTrigger.refresh();
      });
    });
  }, []);



  return (
      <div className="bg-secondary-100">
        <FPSCounter />
      
        <NavBar sectionRefs={sectionRefs.current} />{" "}
        {/* passing sectionRefs props to give access to Navbar, Navbar can then access the props which have access to the array of sectionRef and loop over it */}
        <Hero />
        <main className="px-5 md:px-10 xl:px-20 2xl:px-28">
          <Role forwardedRef={(el) => (sectionRefs.current[0] = el)} />{" "}
          {/* forwardedRef props to pass into the child component to access the ref, then this will go into the useRef array  */}
          <About />
          <Services />
          <Works forwardedRef={(el) => (sectionRefs.current[1] = el)} />
          <Contact />
        </main>
        <Analytics />
        <Footer />
      
    </div>
  );
}

export default App;
