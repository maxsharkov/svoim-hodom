import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Destinations from "@/components/Destinations";
import About from "@/components/About";
import TravelForm from "@/components/TravelForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Destinations />
      <About />
      <TravelForm />
      <Footer />
    </>
  );
}
