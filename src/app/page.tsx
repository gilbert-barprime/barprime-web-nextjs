import About from "../../components/LandingPageSections/About";
import Contact from "../../components/LandingPageSections/Contact";
import Hero from "../../components/LandingPageSections/Hero";
import Pricing from "../../components/LandingPageSections/Pricing";
import Services from "../../components/LandingPageSections/Services";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/header";

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Services />

      {/* Pricing Section */}
      <Pricing />

      {/* Testimonial Section */}
      {/* <Testimonials /> */}

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />

      <Footer />
    </>
  );
}
