import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import spiderOrb from "../assets/spider-orb.png";
import telegramSphere from "../assets/telegram-sphere.png";
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
  dash: "M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z",
  terminal: "M4 17l6-5-6-5M12 19h8",
  company: "M4 20V8l8-4 8 4v12M9 20v-6h6v6",
  crm: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  chat: "M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 1 1 18 0Z",
  search: "M12 22s8-4.5 8-11a8 8 0 1 0-16 0c0 6.5 8 11 8 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  team: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  shop: "M4 9h16l-1 11H5L4 9ZM4 9l2-5h12l2 5M9 13v4M15 13v4",
  wallet: "M3 7h18v12H3V7Zm14 6h4M3 7l2-3h14l2 3",
};

const NavBtn = forwardRef(function NavBtn({ icon, children, active, badge, numbered, chevron, onSelect }, ref) {
  return (
    <button ref={ref} type="button" className={`nav-btn${active ? " is-active" : ""}`} onClick={onSelect}>
      <span className="nav-web" aria-hidden="true" />
      {numbered ? <span className="nav-num">{numbered}</span> : <span className="nav-ico"><Icon path={icon} /></span>}
      <span className="nav-label">{children}</span>
      {badge ? <span className="nav-badge">{badge}</span> : null}
      {chevron ? <span className="nav-chev"><Icon path={I.chevron} size={14} /></span> : null}
      <span className="nav-socket" aria-hidden="true">
        <img className="nav-orb" src={telegramSphere} alt="" />
      </span>
    </button>
  );
});

export default function SidebarPlayground() {
  const [light, setLight] = useState(false);
  const [active, setActive] = useState("dash");
  const panelRef = useRef(null);
  const dropRef = useRef(null);
  const itemsRef = useRef({});
  const activeRef = useRef(active);
  const targetY = useRef(168);
  const currentY = useRef(168);
  const tracking = useRef(false);
  activeRef.current = active;

  const clampY = (y) => {
    const panel = panelRef.current;
    if (!panel) return y;
    return Math.min(panel.offsetHeight - 20, Math.max(36, y));
  };

  const setTarget = (y, isTracking) => {
    tracking.current = isTracking;
    targetY.current = clampY(y);
  };

  const snapToActive = () => {
    const item = itemsRef.current[activeRef.current];
    if (!item) return;
    setTarget(item.offsetTop + item.offsetHeight / 2, false);
  };

  useEffect(() => {
    const drop = dropRef.current;
    if (!drop) return;
    let frame = 0;
    const tick = () => {
      const ease = tracking.current ? 0.28 : 0.16;
      currentY.current += (targetY.current - currentY.current) * ease;
      drop.style.setProperty("--drop-y", `${currentY.current}px`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useLayoutEffect(() => {
    snapToActive();
    currentY.current = targetY.current;
  }, []);

  const bind = (id) => (node) => {
    itemsRef.current[id] = node;
  };

  const themeClass = `sidebar-play${light ? " is-light" : ""}`;
  const themeLabel = light ? "Тёмная тема" : "Светлая тема";
  const toggleTheme = () => setLight((on) => !on);

  return (
    <>
    <section className={themeClass} aria-label="Кнопки меню">
      <button type="button" className="theme-switch" onClick={toggleTheme}>{themeLabel}</button>
      <div
        className="sidebar-panel"
        ref={panelRef}
        onMouseMove={(event) => {
          const panel = panelRef.current;
          if (!panel) return;
          setTarget(event.clientY - panel.getBoundingClientRect().top, true);
        }}
        onMouseLeave={snapToActive}
      >
        <div className="nav-drop" ref={dropRef} aria-hidden="true">
          <span className="nav-silk" />
          <span className="nav-drop-pin">
            <img className="nav-drop-spider" src={spiderOrb} alt="" />
          </span>
        </div>

        <div className="sidebar-brand">
          <span className="sidebar-mark" />
          <div>
            <strong>Monster-Lead</strong>
            <small>CRM SYSTEM</small>
          </div>
        </div>

        <p className="nav-group">Главное</p>
        <div className="nav-stack">
          <NavBtn ref={bind("dash")} icon={I.dash} active={active === "dash"} onSelect={() => setActive("dash")}>Дашборд</NavBtn>
          <NavBtn ref={bind("terminal")} icon={I.terminal} active={active === "terminal"} onSelect={() => setActive("terminal")}>Терминал</NavBtn>
          <NavBtn ref={bind("company")} icon={I.company} active={active === "company"} onSelect={() => setActive("company")}>Моя компания</NavBtn>
          <NavBtn ref={bind("crm")} icon={I.crm} active={active === "crm"} onSelect={() => setActive("crm")}>Lead CRM</NavBtn>
          <NavBtn ref={bind("bots")} icon={I.chat} active={active === "bots"} onSelect={() => setActive("bots")}>Ответы ботов</NavBtn>
          <NavBtn ref={bind("search")} icon={I.search} badge="Бесплатно" chevron active={active === "search"} onSelect={() => setActive("search")}>Поиск лидов</NavBtn>
        </div>

        <p className="nav-group">Пошагово</p>
        <div className="nav-stack">
          <NavBtn ref={bind("setup")} numbered="1" chevron active={active === "setup"} onSelect={() => setActive("setup")}>Настройка</NavBtn>
          <NavBtn ref={bind("session")} numbered="2" chevron active={active === "session"} onSelect={() => setActive("session")}>Работа с сессией</NavBtn>
          <NavBtn ref={bind("channel")} numbered="3" chevron active={active === "channel"} onSelect={() => setActive("channel")}>Работа с каналом</NavBtn>
          <NavBtn ref={bind("team")} icon={I.team} chevron active={active === "team"} onSelect={() => setActive("team")}>Команда</NavBtn>
        </div>

        <p className="nav-group">Сервисы</p>
        <div className="nav-stack">
          <NavBtn ref={bind("shop")} icon={I.shop} active={active === "shop"} onSelect={() => setActive("shop")}>Магазин</NavBtn>
          <NavBtn ref={bind("wallet")} icon={I.wallet} active={active === "wallet"} onSelect={() => setActive("wallet")}>Кошелёк</NavBtn>
        </div>
      </div>
    </section>

    <section className={themeClass} aria-label="Карточка пользователя">
      <button type="button" className="theme-switch" onClick={toggleTheme}>{themeLabel}</button>
      <p className="play-title">Карточка пользователя</p>
      <div className="sidebar-panel">
        <button
          type="button"
          className="user-card is-active"
        >
          <span className="nav-web" aria-hidden="true" />
          <span className="user-ava">LO</span>
          <span className="user-meta">
            <strong>lordakatsukid <em>ADM</em></strong>
            <small>Enterprise Pack · 0 сессий ∞</small>
          </span>
          <span className="nav-socket" aria-hidden="true">
            <img className="nav-orb" src={telegramSphere} alt="" />
          </span>
        </button>
      </div>
    </section>
    </>
  );
}
