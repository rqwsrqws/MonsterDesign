import Hero from "./components/Hero.jsx";
import LoaderLight from "./components/LoaderLight.jsx";

export default function App() {
  return (
    <div className="app">
      <Hero />
      <div className="loader-pair">
        <LoaderLight />
        <LoaderLight theme="dark" />
      </div>
    </div>
  );
}
