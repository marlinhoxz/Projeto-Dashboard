import Sidebar from "@/componentes/sidebar/Sidebar";
import styles from "./page.module.css";
import CardsWidget from "@/componentes/cardsComponets/cartao/Cartao";
import TransactionWidget from "@/componentes/cardsComponets/transaction/Transaction";
import Header from "@/componentes/cardsComponets/header/Header";
import WidgetRelatorio from "@/componentes/cardsComponets/reportWidget/Reportwidget";


export default function Home() {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.main}>
        <Header title="Inicio" notificacao={1}/>
        
        <main className={styles.grid} id="main-content">
          <CardsWidget />
          <TransactionWidget />
          <WidgetRelatorio />
        </main>
      </div>
    </div>
  );
}
