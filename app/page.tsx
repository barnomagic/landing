import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuienesSomos from "./components/QuienesSomos";
import Productos from "./components/Productos";
import PorQueElegirnos from "./components/PorQueElegirnos";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <QuienesSomos />
        <Productos />
        <PorQueElegirnos />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
