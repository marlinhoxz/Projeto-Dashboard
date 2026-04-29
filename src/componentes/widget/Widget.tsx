import styles from './widget.module.css'

interface WidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onAdd?: () => void;
  semAcao?: boolean;
}

export default function Widget({
  title,
  children,
  className = "",
  onAdd,
  semAcao = false,
}: WidgetProps) {
  return (
    <section
      className={`${styles.widget} ${className}`}
      aria-labelledby={`widget-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <header className={styles.header}>
        <h2
          id={`widget-${title.replace(/\s+/g, "-").toLowerCase()}`}
          className={styles.title}
        >
          {title}
        </h2>

        {!semAcao && (
          <button
            className={styles.addBtn}
            aria-label={`Adicionar ${title}`}
            onClick={onAdd}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        )}
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}