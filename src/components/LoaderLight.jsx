import whiteSphereVideo from "../assets/spider-white-sphere.mp4";
import "./LoaderLight.css";

export default function LoaderLight() {
  return (
    <section className="loader-light" aria-label="Загрузка">
      <div className="pulse-stage">
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
