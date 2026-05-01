
import styles from "./budget.module.css";
import { orcamento } from "@/app/data/data.json";
import { SquareCheckBig } from "lucide-react";
import Widget from "../widget/Widget";

type ItemOrcamento = {
  id: string;
  descricao: string;
  valor: number;
  marcado: boolean;
  automatico: boolean;
};

const ITENS_PADRAO = orcamento.itens.filter(
  (item): item is ItemOrcamento =>
    typeof item.id === "string" &&
    typeof item.descricao === "string" &&
    typeof item.valor === "number" &&
    typeof item.marcado === "boolean" &&
    (item.automatico === undefined || typeof item.automatico === "boolean"),
);

const DINHEIRO_PADRAO = orcamento.dinheiro;

export default function BudgetWidget({
  dinheiro = DINHEIRO_PADRAO,
  itens = ITENS_PADRAO,
}: {
  dinheiro?: number;
  itens?: ItemOrcamento[];
}) {
  return (
    <Widget title="Orcamento" className={styles.widgetExpandido}>
      <div className={styles.cashRow}>
        <h3 className={styles.cashLabel}>Caixa</h3>
        <p className={styles.cashAmount}>₦ {dinheiro}</p>
      </div>
      <div>
        <ul className={styles.list} role="list">
          {itens.map((item) => (
            
              <li key={item.id} className={styles.item}>
                <span
                  className={`${styles.checkmark} ${item.marcado ? styles.checked : ""}`}
                >
                  {item.marcado ? (
                    <SquareCheckBig size={40} />
                  ) : (
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      defaultChecked={item.marcado}
                      aria-label={item.descricao}
                    />
                  )}
                </span>
                <div className={styles.itemInfo}>
                  <span className={styles.itemLabel}>{item.descricao}</span>
                  {item.automatico && (
                    <span className={styles.automatedBadge}>Automatico</span>
                  )}
                </div>
                <p className={styles.itemAmount}>₦ {item.valor}</p>
              </li>
          
          ))}
        </ul>
      </div>
    </Widget>
  );
}
