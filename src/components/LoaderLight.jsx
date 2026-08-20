import whiteSphereVideo from "../assets/spider-white-sphere.mp4";
import spiderWeb from "../assets/spider-web.png";
import "./LoaderLight.css";

export default function LoaderLight() {
  return (
    <section className="loader-light" aria-label="Загрузка">
      <div className="pulse-stage">
        <img className="spider-web spider-web-base" src={spiderWeb} alt="" />
        <div className="web-surge">
          <img className="spider-web" src={spiderWeb} alt="" />
        </div>
        <span className="pulse-ring" />
        <span className="pulse-ring" />
        <span className="pulse-ring" />
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
      <p className="loader-brand">Monster-Lead</p>
      <p className="loader-hint">Загрузка</p>
    </section>
  );
}
