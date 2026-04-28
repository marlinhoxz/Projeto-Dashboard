"use client";

import {
  CircleUserRound,
  FileText,
  HandCoins,
  Handshake,
  House,
  Landmark,
  MessageCircleHeart,
  Repeat,
  Settings,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";
import Image from "next/image";
import { useState } from "react";

const NAV_ITEMS = [

  { id: "inicio",
     href: "/", 
     label: "Inicio", 
     icon: House, 
     implementada: true 
  },
  {
    id: "orcamento",
    href: "/budget",
    label: "Orcamento",
    icon: Wallet,
    implementada: false,
  },
  {
    id: "transacoes",
    href: "/transactions",
    label: "Transacoes",
    icon: Repeat,
    implementada: false,
  },
  {
    id: "assinaturas",
    href: "/subscriptions",
    label: "Assinaturas",
    icon: Landmark,
    implementada: false,
  },
  {
    id: "emprestimos",
    href: "/loans",
    label: "Emprestimos",
    icon: HandCoins,
    implementada: false,
  },
  {
    id: "relatorios",
    href: "/reports",
    label: "Relatorios",
    icon: FileText,
    implementada: false,
  },
  {
    id: "economias",
    href: "/savings",
    label: "Economias",
    icon: Handshake,
    implementada: false,
  },
  {
    id: "dicas",
    href: "/advice",
    label: "Dicas financeiras",
    icon: MessageCircleHeart,
    implementada: false,
  },
  {
    id: "conta",
    href: "/account",
    label: "Conta",
    icon: CircleUserRound,
    implementada: false,
  },
  {
    id: "configuracoes",
    href: "/settings",
    label: "Configuracoes",
    icon: Settings,
    implementada: false,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [secaoEmDesenvolvimento, setSecaoEmDesenvolvimento] = useState<string | null>(null);

 
  return (
    <aside className={styles.sidebar} aria-label="Nevegação principal">
      <div className={styles.perfil}>
        <div className={styles.avatar} aria-hidden="true">
          <Image
            src={"/assets/300.jpg"}
            alt="Img User"
            width={40}
            height={40}
            className={styles.img}
          />
        </div>
        <span className={styles.username}>Marlon</span>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList} role="list">
          {NAV_ITEMS.map(({ id, href, implementada, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={id}>
                {implementada ? (
                  <Link
                    href={href}
                    className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon
                      className={styles.navIcon}
                      size={18}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    <span className={styles.labelText}>{label}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={styles.navItem}
                    onClick={() => setSecaoEmDesenvolvimento(label)}
                  >
                    <Icon
                      className={styles.navIcon}
                      size={18}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    <span className={styles.labelText}>{label}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {secaoEmDesenvolvimento && (
        <div
          className={styles.modalOverlay}
          role="presentation"
          onClick={() => setSecaoEmDesenvolvimento(null)}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-labelledby="titulo-modal-desenvolvimento"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="titulo-modal-desenvolvimento"
              className={styles.modalTitulo}
            >
              Em Desenvolvimento
            </h2>
            <p className={styles.modalTexto}>
              {" "}
              a Tela de {secaoEmDesenvolvimento} ainda está em desenvolvimento
            </p>
            <button
              type="button"
              className={styles.modalBotao}
              onClick={() => setSecaoEmDesenvolvimento(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
