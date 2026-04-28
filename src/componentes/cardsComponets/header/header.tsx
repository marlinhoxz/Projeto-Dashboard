import styles from "./header.module.css";

export default function Header({
  title = "Início",
  notificacao = 0,
}: {
  title?: string;
  notificacao?: number;
}) {
  return (
    <header className={styles.header}>
      <h1 className={styles.pageTitle}>{title}</h1>

      <div className={styles.action}>
        <button className={styles.iconBtn} aria-label="Buscar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>

        <button className={styles.iconBtn} aria-label={`${notificacao} notificações`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {notificacao > 0 && (
            <span className={styles.pop} aria-hidden="true">{notificacao}</span>
          )}
        </button>
      </div>
    </header>
  );
}