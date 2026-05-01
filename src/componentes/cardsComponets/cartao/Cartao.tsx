import { cartao } from "@/app/data/data.json";
import styles from "./cartao.module.css";
import Widget from "../widget/Widget";



type Bandeira = "mastercard" | "visa";

type Cartao = {
  saldo: number;
  ultimosQuatroDigitos: string;
  vencimento: string;
  bandeira: Bandeira;
};

function isCartao(value: unknown ): value is Cartao {
    if (typeof value !== 'object' || value === null) return false

    return (
      "saldo" in value &&
      "ultimosQuatroDigitos" in value &&
      "vencimento" in value &&
      "bandeira" in value &&
      typeof value.saldo === 'number' &&
      typeof value.ultimosQuatroDigitos === 'string' &&
      typeof value.vencimento === 'string' &&
      (value.bandeira === 'mastercard' || value.bandeira === 'visa')
    )
  }
  
  const cartaoVerif: unknown = cartao
  if(!isCartao(cartaoVerif)) {
    throw new Error('data.json: cartão inválido')
  }

  const CARTAO_PADRAO = cartaoVerif

export default function CardsWidget({
  cartao = CARTAO_PADRAO,
}: {
  cartao?: Cartao;
}) {
  const [mes, ano] = cartao.vencimento.split("/");

  return (
    <Widget title="Cartoes">
      <article className={styles.card} aria-label="Cartão de crédito">
        <p className={styles.balanceLabel}>Saldo</p>
        <p className={styles.balanceValue} aria-label={`Saldo ${cartao.saldo}`}>
          N {cartao.saldo}
        </p>

        <p className={styles.cardNumber} aria-label={`Final do cartão: ${cartao.ultimosQuatroDigitos}`}>
          {"★★★★ ★★★★ ★★★★"}{" "}
          <span className={styles.lastFour}>{cartao.ultimosQuatroDigitos}</span>
        </p>

        <footer className={styles.cardFooter}>
          <div className={styles.expiry}>
            <span className={styles.expiryLabel}>Validade</span>
            <time dateTime={`20${ano}-${mes}`}>{cartao.vencimento}</time>
          </div>
          <div className={styles.networkLogo} aria-label={cartao.bandeira}>
            {cartao.bandeira === "mastercard" ? <MastercardLogo /> : <VisaLogo />}
          </div>
        </footer>
      </article>
    </Widget>
  );
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 48 30" width="48" height="30" aria-hidden="true">
      <circle cx="18" cy="15" r="14" fill="#eb001b" opacity="0.9" />
      <circle cx="30" cy="15" r="14" fill="#f79e1b" opacity="0.9" />
      <path d="M24 4.6a14 14 0 0 1 0 20.8A14 14 0 0 1 24 4.6z" fill="#ff5f00" opacity="0.8" />
    </svg>
  );
}

function VisaLogo() {
  return (
    <svg viewBox="0 0 60 20" width="60" height="20" aria-hidden="true">
      <text x="0" y="16" fontSize="18" fontWeight="700" fill="#fff" fontFamily="Arial">
        VISA
      </text>
    </svg>
  );
}