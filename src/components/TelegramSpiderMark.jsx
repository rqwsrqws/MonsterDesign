export default function TelegramSpiderMark() {
  return (
    <svg className="tg-logo" viewBox="0 0 48 48" role="img" aria-label="Telegram">
      <defs>
        <linearGradient id="tgFill" x1="12" y1="6" x2="36" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#37c6ff" />
          <stop offset="1" stopColor="#1e96c8" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#tgFill)" />
      <path
        fill="#fff"
        d="M34.8 14.6c.4-.2.8.2.6.7l-4.4 20.8c-.2.7-1 .9-1.6.5l-5.7-4.2-2.8 2.7c-.3.3-.8.1-.9-.3l-.6-5.3 10.8-9.7c.2-.2 0-.5-.2-.4L16.4 24.2l-4.8-1.5c-.8-.2-.8-1.3.1-1.6l23.1-6.5Z"
      />
    </svg>
  );
}
