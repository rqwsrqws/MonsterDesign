import { useEffect, useRef } from "react";
import "./ClimbingSpider.css";

const LEGS = [
  { id: "r1", x: 304, y: 278, rest: 68, tibia: 48, tarsus: 26, len: [84, 74, 60], phase: 0 },
  { id: "r2", x: 338, y: 214, rest: 18, tibia: 32, tarsus: 18, len: [90, 72, 54], phase: Math.PI },
  { id: "r3", x: 336, y: 152, rest: -20, tibia: 28, tarsus: 14, len: [86, 68, 52], phase: 0 },
  { id: "r4", x: 308, y: 108, rest: -58, tibia: 26, tarsus: 12, len: [78, 64, 48], phase: Math.PI },
  { id: "l1", x: 196, y: 278, rest: 112, tibia: -48, tarsus: -26, len: [84, 74, 60], phase: Math.PI },
  { id: "l2", x: 162, y: 214, rest: 162, tibia: -32, tarsus: -18, len: [90, 72, 54], phase: 0 },
  { id: "l3", x: 164, y: 152, rest: 200, tibia: -28, tarsus: -14, len: [86, 68, 52], phase: Math.PI },
  { id: "l4", x: 192, y: 108, rest: 238, tibia: -26, tarsus: -12, len: [78, 64, 48], phase: 0 },
];

function bone(len, a, b) {
  return `M 0 ${-a} L ${len} ${-b} L ${len} ${b} L 0 ${a} Z`;
}

function edge(len, a, b) {
  return `M 0 ${-a} L ${len} ${-b}`;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function steppedEase(p) {
  const steps = 10;
  const x = p * steps;
  const i = Math.floor(x);
  const local = x - i;
  const smooth = local * local * (3 - 2 * local);
  return (i + smooth) / steps;
}

export default function ClimbingSpider() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const start = performance.now();
    const climbMs = 5600;
    let frame;

    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / climbMs);
      const climb = steppedEase(p);
      const walking = p < 1;
      const gaitSpeed = walking ? 9.6 : 3.2;
      const phase = (elapsed / 1000) * gaitSpeed;
      const bob = Math.sin(phase * 2) * (walking ? 3.4 : 1.4);

      const x = lerp(86, 8, climb);
      const y = lerp(112, -58, climb) + bob;
      const rot = lerp(-26, 7, climb) + Math.sin(phase) * (walking ? 3.2 : 0.8);
      const scale = lerp(0.62, 1, climb);

      root.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`;
      root.style.opacity = elapsed < 120 ? String(elapsed / 120) : "1";

      const grip = Math.max(0, (p - 0.82) / 0.18);

      LEGS.forEach((leg) => {
        const swing = Math.sin(phase + leg.phase);
        const lift = Math.max(0, swing) * (walking ? 16 : 4);
        const femur = leg.rest + swing * (walking ? 16 : 5) - lift * 0.15;
        const tibia = leg.tibia - swing * (walking ? 22 : 6) - lift * 0.35 - grip * 8;
        const tarsus = leg.tarsus + swing * (walking ? 14 : 4) + lift * 0.2;

        const femurEl = root.querySelector(`[data-joint="${leg.id}-f"]`);
        const tibiaEl = root.querySelector(`[data-joint="${leg.id}-t"]`);
        const tarsusEl = root.querySelector(`[data-joint="${leg.id}-s"]`);
        if (femurEl) femurEl.setAttribute("transform", `translate(${leg.x} ${leg.y}) rotate(${femur})`);
        if (tibiaEl) tibiaEl.setAttribute("transform", `translate(${leg.len[0]} 0) rotate(${tibia})`);
        if (tarsusEl) tarsusEl.setAttribute("transform", `translate(${leg.len[1]} 0) rotate(${tarsus})`);
      });

      const body = root.querySelector("[data-body]");
      if (body) {
        body.setAttribute("transform", `translate(0 ${Math.sin(phase * 2) * 2.2})`);
      }
      const fangs = root.querySelector("[data-fangs]");
      if (fangs) {
        fangs.setAttribute("transform", `translate(250 318) scale(1 ${1 + Math.sin(elapsed / 180) * 0.04}) translate(-250 -318)`);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      ref={rootRef}
      className="spider"
      viewBox="0 0 500 460"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="mlGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="armor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a1638" />
          <stop offset="42%" stopColor="#0c0a10" />
          <stop offset="100%" stopColor="#050308" />
        </linearGradient>
        <linearGradient id="ribGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff7bff" />
          <stop offset="55%" stopColor="#d000ff" />
          <stop offset="100%" stopColor="#7a00a8" />
        </linearGradient>
      </defs>

      {LEGS.map((leg) => (
        <g key={leg.id} data-joint={`${leg.id}-f`} filter="url(#mlGlow)">
          <path className="armor-plate" d={bone(leg.len[0], 11, 8)} />
          <path className="neon-edge" d={edge(leg.len[0], 11, 8)} />
          <g data-joint={`${leg.id}-t`}>
            <path className="armor-plate" d={bone(leg.len[1], 8, 6)} />
            <path className="neon-edge" d={edge(leg.len[1], 8, 6)} />
            <g data-joint={`${leg.id}-s`}>
              <path className="armor-plate" d={bone(leg.len[2], 6, 2.2)} />
              <path className="neon-edge" d={edge(leg.len[2], 6, 2.2)} />
            </g>
          </g>
        </g>
      ))}

      <g data-body filter="url(#mlGlow)">
        <path
          className="armor-plate body-shell"
          d="M250 64 C338 78 364 148 354 208 C344 262 304 286 250 292 C196 286 156 262 146 208 C136 148 162 78 250 64 Z"
        />
        <path
          className="neon-edge"
          d="M250 64 C338 78 364 148 354 208 C344 262 304 286 250 292 C196 286 156 262 146 208 C136 148 162 78 250 64 Z"
        />
        <path className="rib" d="M250 96 L250 248" />
        <path className="rib" d="M186 122 Q250 142 314 122" />
        <path className="rib" d="M172 158 Q250 184 328 158" />
        <path className="rib" d="M184 198 Q250 222 316 198" />
        <path className="rib" d="M208 232 Q250 248 292 232" />

        <path
          className="armor-plate"
          d="M214 250 C220 292 234 322 250 328 C266 322 280 292 286 250 C268 262 232 262 214 250 Z"
        />
        <path
          className="neon-edge"
          d="M214 250 C220 292 234 322 250 328 C266 322 280 292 286 250 C268 262 232 262 214 250 Z"
        />

        <g className="eyes">
          <ellipse cx="228" cy="272" rx="11" ry="7.5" />
          <ellipse cx="272" cy="272" rx="11" ry="7.5" />
          <ellipse cx="238" cy="288" rx="6.5" ry="4.5" />
          <ellipse cx="262" cy="288" rx="6.5" ry="4.5" />
        </g>

        <g data-fangs>
          <path className="armor-plate fang" d="M232 318 L214 378 L246 332 Z" />
          <path className="neon-edge" d="M232 318 L214 378 L246 332 Z" />
          <path className="armor-plate fang" d="M268 318 L286 378 L254 332 Z" />
          <path className="neon-edge" d="M268 318 L286 378 L254 332 Z" />
        </g>
      </g>
    </svg>
  );
}
