import { useEffect, useState } from "react";
import whiteSphereVideo from "../assets/spider-white-sphere.mp4";
import spiderWeb from "../assets/spider-web.png";
import "./LoaderLight.css";

export default function LoaderLight({ progress, theme = "light" }) {
  const [simulated, setSimulated] = useState(0);
  const value = progress ?? simulated;
  const done = value >= 100;

  useEffect(() => {
    if (progress != null) return undefined;
    setSimulated(0);
    let current = 0;
    const id = window.setInterval(() => {
      current = Math.min(100, current + 1.4 + Math.random() * 3.2);
      setSimulated(current);
      if (current >= 100) window.clearInterval(id);
    }, 160);
    return () => window.clearInterval(id);
  }, [progress]);

  return (
    <section
      className={`loader-light${theme === "dark" ? " is-dark" : ""}`}
      aria-label="Загрузка"
      aria-busy={!done}
    >
      <div className="pulse-stage">
        <img className="spider-web spider-web-base" src={spiderWeb} alt="" />
        <div className="web-surge">
          <img className="spider-web" src={spiderWeb} alt="" />
        </div>
        <span className="pulse-ring" />
        <span className="pulse-ring" />
        <span className="pulse-ring" />
        <div className="loader-shell" style={{ "--load": `${value}%` }}>
          <div className="loader-fill" aria-hidden="true">
            <div className="loader-liquid">
              <svg className="loader-wave" viewBox="0 0 120 20" preserveAspectRatio="none">
                <path d="M0 10 Q15 0 30 10 T60 10 T90 10 T120 10 V20 H0 Z" />
              </svg>
            </div>
          </div>
          <div className="loader-orb">
            <video
              className="loader-video"
              src={whiteSphereVideo}
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
            />
          </div>
        </div>
      </div>
      <p className="loader-brand">Monster-Lead</p>
      <p className="loader-hint">{done ? "Готово" : `Загрузка ${Math.round(value)}%`}</p>
    </section>
  );
}
