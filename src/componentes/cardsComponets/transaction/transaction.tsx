import { useEffect, useRef} from "react";
import Widget from "../widget/Widget";
import styles from "./transaction.module.css";
import { transacoes } from "@/app/data/data.json";

type TipoTransacao = "debito" | "credito";

type Transacao = {
  id: string;
  nome: string;
  data: string;
  valor: number;
  tipo: TipoTransacao;
  iniciais: string;
};

const TRANSACOES_PADRAO = transacoes.filter(
  (transacao): transacao is Transacao =>
    transacao.tipo === "debito" || transacao.tipo === "credito",
);

export default function TransactionWidget({
  transactions = TRANSACOES_PADRAO,
}: {
  transactions?: Transacao[];
}) {
  return (
    <Widget title="Todas as Transacoes">
      <ul className={styles.list} role="list">
        {transactions.map(({ id, iniciais, nome, data, tipo, valor }) => (
          <li key={id} className={styles.item}>
            <div className={styles.avatar} aria-hidden="true">
              {iniciais}
            </div>
            <div className={styles.info}>
              <p className={styles.name}>{nome}</p>
              <time className={styles.date} dateTime={data}>
                {data}
              </time>
            </div>
            <p
              className={`${styles.amount} ${tipo === "debito" ? styles.debit : styles.credit}`}
              aria-label={`${tipo === "debito" ? "Debito" : "Credito"}: ${valor}`}
            >
              {tipo === "credito" ? "+" : "-"} ₦ <NumeroCrescente valor={valor}/>
            </p>
          </li>
        ))}
      </ul>
    </Widget>
  );
}

type NumeroPros = {
  valor: number
  duracao?: number
}

function NumeroCrescente({valor, duracao = 1000}: NumeroPros) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const elemento = ref.current
    if(!elemento) return

    let inicio: number | null = null

    function passo(tempo: number) {
      if(!inicio) inicio = tempo

      const progresso = Math.min((tempo - inicio) / duracao, 1)
      const suavizado = 1 - Math.pow(1 - progresso, 3);

      elemento!.textContent = Math.floor(suavizado * valor).toString();

      if (progresso < 1) requestAnimationFrame(passo);
    }

    requestAnimationFrame(passo)
  },[valor, duracao])

  return <span ref={ref}>0</span>
}