'use client'

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap'
import styles from "./saving.module.css";
import { poupanca } from "@/app/data/data.json";
import Widget from '../widget/Widget';

const META_PADRAO = poupanca.meta;
const ALCANCADO_PADRAO = poupanca.alcancado;

export default function WidgetEconomias({
  meta = META_PADRAO,
  alcancado = ALCANCADO_PADRAO,
}: {
  meta?: number;
  alcancado?: number;
}) {
  const percentual = Math.min(100, Math.max(0, Math.round((alcancado / meta) * 100)));
  const raio = 44;
  const circunferencia = 2 * Math.PI * raio;
  const deslocamento = circunferencia + (percentual / 100) * circunferencia;
  const circuloRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        if (entradas[0].isIntersecting) setVisivel(true);
      },
      { threshold: 0.3 }
    );

    const elemento = containerRef.current;
    if (elemento) observer.observe(elemento);
    return () => observer.disconnect();
  }, []);

   useEffect(() => {
    if (!circuloRef.current || !visivel) return;

    gsap.fromTo(
      circuloRef.current,
      { strokeDashoffset: circunferencia },
      { strokeDashoffset: deslocamento, duration: 0.7, ease: 'power2.out' }
    );
  }, [visivel, deslocamento]);


  return (
    <Widget title="Economias">
      <div className={styles.layout}>
        <div className={styles.donutWrapper} ref={containerRef} aria-hidden="true">
          <svg viewBox="0 0 110 110" className={styles.donut}>
            <circle
              cx="55"
              cy="55"
              r={raio}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="14"
            />
            <circle
              cx="55"
              cy="55"
              r={raio}
              ref={circuloRef}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circunferencia}
              strokeDashoffset={circunferencia}
              className={styles.progresso}
            />
          </svg>
          <span className={styles.rotuloPorcentagem}>{percentual}%</span>
        </div>

        <dl className={styles.estatisticas}>
          <div className={styles.grupoEstatistica}>
            <dt className={styles.rotuloEstatistica}>Meta de economia</dt>
            <dd className={styles.valorEstatistica}>₦ {meta}</dd>
          </div>
          <div className={styles.grupoEstatistica}>
            <dt className={styles.rotuloEstatistica}>Meta atingida</dt>
            <dd className={styles.valorEstatistica}>₦ {alcancado}</dd>
          </div>
        </dl>
      </div>
    </Widget>
  );
}
