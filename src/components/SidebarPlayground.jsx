import { useState } from "react";
import "./SidebarPlayground.css";

function Icon({ path, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const I = {
  chevron: "M9 6l6 6-6 6",
  terminal: "M4 17l6-5-6-5M12 19h8",
  company: "M4 20V8l8-4 8 4v12M9 20v-6h6v6",
  crm: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  chat: "M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 1 1 18 0Z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  doc: "M7 3h8l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z",
  team: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  shop: "M4 9h16l-1 11H5L4 9ZM4 9l2-5h12l2 5M9 13v4M15 13v4",
  wallet: "M3 7h18v12H3V7Zm14 6h4M3 7l2-3h14l2 3",
};

function NavBtn({ icon, children, active, badge, numbered, chevron, onSelect }) {
  return (
    <button type="button" className={`nav-btn${active ? " is-active" : ""}`} onClick={onSelect}>
      {numbered ? <span className="nav-num">{numbered}</span> : <span className="nav-ico"><Icon path={icon} /></span>}
      <span className="nav-label">{children}</span>
      {badge ? <span className="nav-badge">{badge}</span> : null}
      {chevron ? <span className="nav-chev"><Icon path={I.chevron} size={14} /></span> : null}
    </button>
  );
}

export default function SidebarPlayground() {
  const [active, setActive] = useState("bots");

  return (
    <section className="sidebar-play" aria-label="Кнопки меню">
      <div className="sidebar-panel">
        <div className="sidebar-brand">
          <span className="sidebar-mark" />
          <div>
            <strong>Monster-Lead</strong>
            <small>CRM SYSTEM</small>
          </div>
        </div>

        <div className="nav-stack">
          <NavBtn icon={I.terminal} chevron active={active === "terminal"} onSelect={() => setActive("terminal")}>Терминал</NavBtn>
          <NavBtn icon={I.company} active={active === "company"} onSelect={() => setActive("company")}>Моя компания</NavBtn>
          <NavBtn icon={I.crm} active={active === "crm"} onSelect={() => setActive("crm")}>Lead CRM</NavBtn>
          <NavBtn icon={I.chat} active={active === "bots"} onSelect={() => setActive("bots")}>Ответы ботов</NavBtn>
          <NavBtn icon={I.search} badge="Бесплатно" chevron active={active === "search"} onSelect={() => setActive("search")}>Поиск лидов</NavBtn>
        </div>

        <p className="nav-group">Пошагово</p>
        <div className="nav-stack">
          <NavBtn numbered="1" chevron active={active === "setup"} onSelect={() => setActive("setup")}>Настройка</NavBtn>
          <NavBtn numbered="2" chevron active={active === "session"} onSelect={() => setActive("session")}>Работа с сессией</NavBtn>
          <NavBtn numbered="3" chevron active={active === "channel"} onSelect={() => setActive("channel")}>Работа с каналом</NavBtn>
          <NavBtn icon={I.team} chevron active={active === "team"} onSelect={() => setActive("team")}>Команда</NavBtn>
        </div>

        <p className="nav-group">Сервисы</p>
        <div className="nav-stack">
          <NavBtn icon={I.shop} active={active === "shop"} onSelect={() => setActive("shop")}>Магазин</NavBtn>
          <NavBtn icon={I.wallet} active={active === "wallet"} onSelect={() => setActive("wallet")}>Кошелёк</NavBtn>
        </div>

        <button
          type="button"
          className={`user-card${active === "user" ? " is-active" : ""}`}
          onClick={() => setActive("user")}
        >
          <span className="user-ava">LO</span>
          <span className="user-meta">
            <strong>lordakatsukid <em>ADM</em></strong>
            <small>Enterprise Pack · 0 сессий ∞</small>
          </span>
        </button>
      </div>
    </section>
  );
}
