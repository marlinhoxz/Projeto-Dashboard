import Widget from "@/componentes/widget/Widget";
import styles from "./dica.module.css";
import { conselho } from "@/app/data/data.json";

const CONSELHO_PADRAO = conselho.texto;

export default function WidgetConselho({
  conselho = CONSELHO_PADRAO,
}: {
  conselho?: string;
}) {
  return (
    <Widget title="Conselho" semAcao className={styles.cardHeight}>
      <div className={styles.conteudo}>
        <blockquote className={styles.conselho}>{conselho}</blockquote>
      </div>
    </Widget>
  );
}
