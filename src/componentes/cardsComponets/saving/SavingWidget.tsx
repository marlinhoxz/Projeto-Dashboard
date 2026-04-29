import Widget from "@/componentes/widget/Widget";
import styles from "./saving.module.css";
import { poupanca } from "@/app/data/data.json";

const META_PADRAO = poupanca.meta;
const ALCANCADO_PADRAO = poupanca.alcancado;

export default function WidgetEconomias({
  meta = META_PADRAO,
  alcancado = ALCANCADO_PADRAO,
}: {
  meta?: number;
  alcancado?: number;
}) {
  const percentual = Math.round((alcancado / meta) * 100);

  return (
    <Widget title="Economias">
      <div className={styles.layout}>
        <div
          className={styles.donut}
          style={{
            background: `conic-gradient(var(--accent) ${percentual}%, rgba(255,255,255,0.06) 0%)`,
          }}
          aria-hidden="true"
        >
          <div className={styles.donutCenter}>
            <span className={styles.rotuloPorcentagem}>{percentual}%</span>
          </div>
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