import Widget from "@/componentes/widget/Widget";
import styles from "./subscription.module.css";
import { assinaturas } from "@/app/data/data.json";
import { Bell } from 'lucide-react'

type Assinatura = {
  id: string;
  nome: string;
  vencimento: string;
  valor: number;
  cor: string;
};

const ASSINATURA_PADRAO = assinaturas.filter(
  (item): item is Assinatura =>
    typeof item.id === "string" &&
    typeof item.nome === "string" &&
    typeof item.vencimento === 'string' &&
    typeof item.valor === 'number'
);

export default function WidgetAssinatura({assinaturas = ASSINATURA_PADRAO,}:{
    assinaturas?: Assinatura[]
}
) {
  return (
    <Widget title="Assinaturas" className={styles.cardHeight}>
        <ul className={styles.list} role="list">
            {assinaturas.map(({id, nome, vencimento, valor}) => (
                <li key={id} className={styles.item}>
                    <div className={styles.icone} style={{background: '#8f0303'}} aria-hidden='true'>
                        <Bell size={19} />
                    </div>
                    <div className={styles.info}>
                        <p className={styles.nome}>{nome}</p>
                        <time className={styles.vencimento} dateTime={vencimento}>vence em {vencimento}</time>
                    </div>
                    <p className={styles.valor}>₦ {valor}</p>
        
                </li>
            ))}
        </ul>
    </Widget>
  );
}
