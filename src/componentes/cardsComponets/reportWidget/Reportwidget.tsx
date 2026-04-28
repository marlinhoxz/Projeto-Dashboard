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
  const maiorTotalMensal = meses.reduce(
    (acumulado, item) =>
      item.destaque ? acumulado : Math.max(acumulado, item.receita + item.despesa),
    0
  );

  return (
    <Widget title="Report">
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
                    className={`${styles.segmentoTopo} ${destaque ? styles.destaqueTrue : styles.destaqueFalse}`}
                    style={{ height: `${alturaBarra}%` }}
                  />
                  <div className={styles.segmentoBase} style={{ height: `${alturaSegmentoBase}%` }} />
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