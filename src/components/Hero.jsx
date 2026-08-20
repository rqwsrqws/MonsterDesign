import logo3d from "../assets/spider-telegram-logo.png";
import demoVideo from "../assets/generated_video.mp4";
import TelegramSpiderMark from "./TelegramSpiderMark.jsx";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <header className="topbar">
        <div className="brand">
          <img
            className="brand-logo"
            src={logo3d}
            alt="Monster-Lead"
            width="48"
            height="38"
          />
          <span>Monster-Lead CRM SYSTEM</span>
        </div>
        <nav className="nav">
          <a href="#home">Главная</a>
          <a href="#tools">Инструменты</a>
          <a href="#plans">Тарифы</a>
          <a href="#news">Новости</a>
          <a href="#about">О нас</a>
        </nav>
        <div className="top-actions">
          <button type="button" className="ghost">
            Войти
          </button>
          <button type="button" className="primary">
            Регистрация
          </button>
        </div>
      </header>

      <div className="hero-grid">
        <div className="copy">
          <h1>
            Автоматический сбор лидов из{" "}
            <span className="telegram-target">
              <TelegramSpiderMark />
              <span className="tg-word">Telegram</span>
            </span>
            -чатов
          </h1>
          <p>
            Monster-Lead — CRM и генерация лидов из Telegram: система сама находит
            клиентов, без ручного мониторинга чатов.
          </p>
          <div className="cta-row">
            <button type="button" className="cta">
              Начать бесплатно →
            </button>
          </div>
          <ul className="features">
            <li>Radar</li>
            <li>CRM</li>
            <li>AI-анализ</li>
            <li>Нейрокомментинг</li>
          </ul>
        </div>

        <div className="hero-visual">
          <video
            className="hero-3d-logo"
            src={demoVideo}
            autoPlay
            muted
            playsInline
            disablePictureInPicture
          />
          <aside className="preview" aria-hidden="true">
            <article className="card">
              <header>
                Новый лид · Radar <span>HOT</span>
              </header>
              <p>«Ищу обменник USDT, срочно»</p>
            </article>
            <article className="card">
              <header>Нейрокомментинг</header>
              <p>Комментарий под постом крипто-канала</p>
            </article>
            <article className="card">
              <header>
                Lead CRM <span className="new">New</span>
              </header>
              <p>@crypto_user</p>
            </article>
            <div className="stats">
              <div>48 ключей</div>
              <div>127 лидов</div>
              <div className="today">Сегодня +34 лида</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
