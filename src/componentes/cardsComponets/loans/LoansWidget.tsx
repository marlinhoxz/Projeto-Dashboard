 'use client'

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Widget from "@/componentes/widget/Widget";
import styles from "./loans.module.css";
import { emprestimos } from "@/app/data/data.json";
import Image from "next/image";

type Emprestimo = {
  id: string;
  descricao: string;
  valorTotal: number;
  valorRestante: number;
  dataTomada: string;
  iniciais: string;
};

const EMPRESTIMOS_PADRAO = emprestimos.filter(
  (item): item is Emprestimo =>
    typeof item.id === "string" &&
    typeof item.descricao === "string" &&
    typeof item.valorTotal === "number" &&
    typeof item.valorRestante === "number" &&
    typeof item.dataTomada === "string" &&
    typeof item.iniciais === "string",
);

export default function LoandsWdiget({
  itens = EMPRESTIMOS_PADRAO,
}: {
  itens?: Emprestimo[];
}) {
  const barrasRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!barrasRef.current.length) return;

    gsap.to(barrasRef.current, {
      width: (_, elemento) => elemento.dataset.targetWidth ?? "0%",
      duration: 1,
      ease: "power2.out",
      stagger: 0.1,
    });
  }, []);

  barrasRef.current = [];

  return (
    <Widget title="Emprestimos" className={styles.cardHight}>
      <ul className={styles.list} role="list">
        {itens.map(
          ({
            id,
            descricao,
            valorTotal,
            valorRestante,
            dataTomada,
            iniciais,
          }) => {
            const percentualPago = Math.round(
              ((valorTotal - valorRestante) / valorTotal) * 100,
            );
            return (
              <li key={id} className={styles.item}>
                <div className={styles.cabecalho}>
                  <div className={styles.avatar} aria-hidden="true">
                    <Image
                      src="/assets/loans.jpg"
                      alt=""
                      width={50}
                      height={50}
                      className={styles.img}
                    />
                  </div>
                  <p className={styles.descricao}>{descricao}</p>
                  <p className={styles.valorTotal}>₦ {valorTotal}</p>
                </div>

                <div className={styles.metadados}>
                  <span>
                    Data do emprestimo{" "}
                    <time dateTime={dataTomada}>{dataTomada}</time>
                  </span>
                  <span>Valor restante ₦ {valorRestante}</span>
                </div>

                <div
                  className={styles.trilhaProgresso}
                  role="progressbar"
                  aria-valuenow={percentualPago}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Progresso em empréstimo ${percentualPago}%`}
                >
                  <div
                    ref={(elemento) => {
                      if (elemento) barrasRef.current.push(elemento);
                    }}
                    className={styles.progressbar}
                    data-target-width={`${percentualPago}%`}
                    style={{ width: "0%" }}
                  />
                </div>
              </li>
            );
          },
        )}
      </ul>
    </Widget>
  );
}
