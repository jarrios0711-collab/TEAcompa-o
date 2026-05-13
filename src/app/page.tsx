import Hero from "@/components/Hero";
import NuestrasRutas from "@/components/NuestrasRutas";
import Comunidad from "@/components/Comunidad";
import Buscador from "@/components/Buscador";
import RecursosUtiles from "@/components/RecursosUtiles";
import MapaInteractivo from "@/components/MapaInteractivo";
import Formulario from "@/components/Formulario";
import Perfiles from "@/components/Perfiles";

export default function Home() {
  return (
    <>
      <Hero />
      <NuestrasRutas />
      <Comunidad />
      <Buscador />
      <RecursosUtiles />
      <MapaInteractivo />
      <Formulario />
      <Perfiles />
    </>
  );
}
