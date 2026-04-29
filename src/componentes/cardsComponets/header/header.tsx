"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Search, Bell } from "lucide-react";
import styles from "./header.module.css";

export default function Header({
  title = "Início",
  notificacao = 0,
  onMenuClick,
}: {
  title?: string;
  notificacao?: number;
  onMenuClick?: () => void;
}) {
  const [menuNotificacoesAberto, setMenuNotificacoesAberto] = useState(false);
  const areaNotificacoesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleCliqueFora(event: MouseEvent) {
      if (!areaNotificacoesRef.current) return;
      if (areaNotificacoesRef.current.contains(event.target as Node)) return;
      setMenuNotificacoesAberto(false);
    }

    document.addEventListener("mousedown", handleCliqueFora);
    return () => document.removeEventListener("mousedown", handleCliqueFora);
  }, []);

  return (
    <header className={styles.header}>
      <h1 className={styles.pageTitle}>{title}</h1>

      <div className={styles.action}>
        <button
          type="button"
          className={`${styles.iconBtn} ${styles.menuBtn}`}
          aria-label="Abrir menu"
          onClick={onMenuClick}
        >
          <Menu size={18} strokeWidth={2} aria-hidden="true" />
        </button>

        <button type="button" className={styles.iconBtn} aria-label="Buscar">
          <Search size={18} strokeWidth={2} aria-hidden="true" />
        </button>

        <div className={styles.notificacoesArea} ref={areaNotificacoesRef}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label={`${notificacao} notificações`}
            aria-expanded={menuNotificacoesAberto}
            aria-haspopup="dialog"
            onClick={() => setMenuNotificacoesAberto((estadoAtual) => !estadoAtual)}
          >
            <Bell size={18} strokeWidth={2} aria-hidden="true" />
            {notificacao > 0 && (
              <span className={styles.pop} aria-hidden="true">{notificacao}</span>
            )}
          </button>

          {menuNotificacoesAberto && (
            <div className={styles.notificacoesCard} role="dialog" aria-label="Notificações">
              <p className={styles.notificacoesTitulo}>Notificações</p>
              <p className={styles.notificacoesVazio}>Sem notificações no momento.</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}