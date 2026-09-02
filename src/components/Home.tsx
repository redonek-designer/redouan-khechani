"use client";

import { motion } from "framer-motion";
import { useExperience } from "./providers/ExperienceProvider";
import LoadingScreen from "./LoadingScreen";
import IntroGate from "./IntroGate";
import Navbar from "./Navbar";
import CustomCursor from "./CustomCursor";
import FloatingWhatsApp from "./FloatingWhatsApp";
import Hero from "./sections/Hero";
import MusicPlayer from "./sections/MusicPlayer";
import Events from "./sections/Events";
import About from "./sections/About";
import ParallaxSection from "./sections/ParallaxSection";
import Gallery from "./sections/Gallery";
import LocationMap from "./sections/LocationMap";
import Booking from "./sections/Booking";
import Footer from "./sections/Footer";

export default function Home() {
  const { experienceStarted } = useExperience();

  return (
    <>
      <LoadingScreen />
      <IntroGate />
      <CustomCursor />

      <div className="film-grain" />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: experienceStarted ? 1 : 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{
          pointerEvents: experienceStarted ? "auto" : "none",
          filter: experienceStarted ? "blur(0px)" : "blur(4px)",
        }}
        className="relative"
      >
        <Navbar />
        <Hero />
        <MusicPlayer />
        <Events />
        <About />
        <ParallaxSection />
        <Gallery />
        <LocationMap />
        <Booking />
        <Footer />
      </motion.main>

      <FloatingWhatsApp />
    </>
  );
}
