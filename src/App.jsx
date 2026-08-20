import Hero from "./components/Hero.jsx";
import LoaderLight from "./components/LoaderLight.jsx";
import SidebarPlayground from "./components/SidebarPlayground.jsx";

export default function App() {
  return (
    <div className="app">
      <Hero />
      <div className="loader-pair">
        <LoaderLight />
        <LoaderLight theme="dark" />
      </div>
      <SidebarPlayground />
    </div>
  );
}
