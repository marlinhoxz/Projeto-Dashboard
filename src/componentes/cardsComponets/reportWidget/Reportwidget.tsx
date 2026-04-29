 'use client'

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Widget from "@/componentes/widget/Widget";
import { relatorio } from "@/app/data/data.json";
import styles from "./report.module.css";

type DadosMensais = {
  mes: string;
  receita: number;
  despesa: number;
  destaque?: boolean;
};

const meses: DadosMensais[] = relatorio.mensal;
const ESCALA_Y = [100, 75, 50, 25, 0];

export default function WidgetRelatorio() {
  const segmentosTopoRef = useRef<HTMLDivElement[]>([]);
  const segmentosBaseRef = useRef<HTMLDivElement[]>([]);

  const maiorTotalMensal = meses.reduce(
    (acumulado, item) =>
      item.destaque ? acumulado : Math.max(acumulado, item.receita + item.despesa),
    0
  );

  useEffect(() => {
    if (!segmentosTopoRef.current.length || !segmentosBaseRef.current.length) return;

    gsap.to(segmentosTopoRef.current, {
      height: (_, elemento) => elemento.dataset.targetHeight ?? "0%",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.08,
    });

    gsap.to(segmentosBaseRef.current, {
      height: (_, elemento) => elemento.dataset.targetHeight ?? "0%",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.08,
      delay: 0.1,
    });
  }, []);

  segmentosTopoRef.current = [];
  segmentosBaseRef.current = [];

  return (
    <Widget title="Report" className={styles.cardHeight}>
      <div className={styles.grafico} aria-label="Receita e despesas mensais">
        <div className={styles.eixoY}>
          {ESCALA_Y.map((valor) => (
            <span key={valor} className={styles.rotuloY}>{valor}</span>
          ))}
        </div>

        <div className={styles.faixaBarras}>
          {meses.map(({ mes, receita, despesa, destaque }) => {
            const totalMes = receita + despesa;
            const alturaBarra = destaque ? 65 : (totalMes / maiorTotalMensal) * 50;
            const alturaSegmentoBase = destaque ? 50 : alturaBarra * (despesa / totalMes);

            return (
              <div key={mes} className={styles.grupoMes}>
                <div className={styles.trilha}>
                  <div
                    ref={(elemento) => {
                      if (elemento) segmentosTopoRef.current.push(elemento);
                    }}
                    className={`${styles.segmentoTopo} ${destaque ? styles.destaqueTrue : styles.destaqueFalse}`}
                    data-target-height={`${alturaBarra}%`}
                    style={{ height: "0%" }}
                  />
                  <div
                    ref={(elemento) => {
                      if (elemento) segmentosBaseRef.current.push(elemento);
                    }}
                    className={styles.segmentoBase}
                    data-target-height={`${alturaSegmentoBase}%`}
                    style={{ height: "0%" }}
                  />
                </div>
                <span className={styles.rotuloMes}>{mes}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Widget>
  );
}