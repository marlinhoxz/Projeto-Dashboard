 "use client";

import { useState } from "react";
import Sidebar from "@/componentes/sidebar/Sidebar";
import styles from "./page.module.css";
import CardsWidget from "@/componentes/cardsComponets/cartao/Cartao";
import TransactionWidget from "@/componentes/cardsComponets/transaction/Transaction";
import Header from "@/componentes/cardsComponets/header/header";
import WidgetRelatorio from "@/componentes/cardsComponets/reportWidget/Reportwidget";
import BudgetWidget from "@/componentes/cardsComponets/budget/BudgetWidget";
import WidgetAssinatura from "@/componentes/cardsComponets/Subscripition/Subscription";
import WidgetEconomias from "@/componentes/cardsComponets/saving/SavingWidget";
import LoandsWdiget from "@/componentes/cardsComponets/loans/LoansWidget";
import WidgetConselho from "@/componentes/cardsComponets/dicaFinanceira/Dicafinance";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={styles.main}>
        <Header
          title="Inicio"
          notificacao={1}
          onMenuClick={() => setSidebarOpen((estadoAtual) => !estadoAtual)}
        />

        <main className={styles.grid} id="main-content">
         
         <div className={styles.coluna}>
          <CardsWidget />
          <BudgetWidget />
         </div>
         
         <div className={styles.coluna}>
          <TransactionWidget />
            <WidgetAssinatura/>
            <LoandsWdiget/>
         </div>
          
          
         <div className={styles.coluna}>
            <WidgetRelatorio />
            <WidgetEconomias/>
            <WidgetConselho/>

         </div>
            
          
        </main>
      </div>
    </div>
  );
}
