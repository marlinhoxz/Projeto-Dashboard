import { useEffect, useRef, useState } from "react";
import styles from "./widget.module.css";

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
  const [modal, setModalAberto] = useState(false);
  const areaModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleCliqueFora(event: MouseEvent) {
      if (!areaModalRef.current) return;
      if (!areaModalRef.current.contains(event.target as Node)) return;
      setModalAberto(false);
    }

    document.addEventListener("click", handleCliqueFora);
    return () => document.removeEventListener("click", handleCliqueFora);
  }, []);

  function handleAdd() {
    if (onAdd) {
      onAdd();
    } else {
      setModalAberto((estadoAtual) => !estadoAtual);
    }
  }

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
          <div>
            <button
              className={styles.addBtn}
              aria-label={`Adicionar ${title}`}
              aria-haspopup="dialog"
              onClick={handleAdd}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            
            {modal && (
              <div className={styles.modal} role="dialog" aria-label="{`${title} em Desenvolvimento`}">
                <p className={styles.modalTitulo}>Em desenvolvimento</p>
                <p className={styles.modalTexto}>Essa funcionalidade estará disponivel em breve.</p>
              </div>
            )}
          </div>
        )}
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
