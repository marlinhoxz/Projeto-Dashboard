# Projeto para Processo seletivo para Marcasite

Aplicacao web de dashboard financeiro desenvolvida com Next.js, React e TypeScript.
O projeto apresenta um painel com widgets de cartoes, transacoes, relatorios, orcamento, assinaturas, poupanca, emprestimos e dicas financeiras.

## Tecnologias utilizadas

- Next.js 16 (App Router)
- React 19
- TypeScript
- CSS Modules
- `lucide-react` para icones
- JSON local como fonte de dados (`data/dashboard.json`)

## Como o codigo esta organizado

```text
finance-dashboard/
|- app/
|  |- layout.tsx         # Layout base e metadata da aplicacao
|  |- page.tsx           # Pagina principal do dashboard
|  |- globals.css        # Estilos globais
|  |- page.module.css    # Layout da grade principal
|- components/
|  |- Sidebar.tsx        # Menu lateral e modal de secoes em desenvolvimento
|  |- Header.tsx         # Cabecalho com titulo e acoes
|  |- Widget.tsx         # Componente base reutilizavel para cards
|  |- *Widget.tsx        # Widgets especificos do painel
|  |- *.module.css       # Estilos encapsulados por componente
|- data/
|  |- dashboard.json     # Dados mockados consumidos pelos widgets
|- package.json          # Scripts e dependencias
|- tsconfig.json         # Configuracao TypeScript
```

## Arquitetura e funcionamento

- A tela inicial fica em `app/page.tsx`, que monta o layout com `Sidebar`, `Header` e uma grade de widgets.
- O componente `Widget` define a estrutura padrao de cada bloco (titulo, botao e corpo), reduzindo repeticao.
- Cada widget (`TransactionsWidget`, `BudgetWidget`, etc.) encapsula sua propria logica e estilos.
- Os dados sao carregados localmente a partir de `data/dashboard.json`.
- O TypeScript tipa os dados exibidos no painel; por exemplo, `TransactionsWidget` valida o tipo de transacao (`debito` ou `credito`) antes de renderizar.
- A barra lateral usa `lucide-react` para os icones e `usePathname` para destacar a rota ativa.

## Padroes adotados no projeto

- **Componentizacao**: cada responsabilidade visual/funcional fica em um componente dedicado.
- **Estilo modular**: uso de CSS Modules para evitar conflito de classes.
- **Tipagem forte**: interfaces e tipos para dados vindos do JSON.
- **Alias de importacao**: caminho `@/` configurado no `tsconfig.json`.

## Requisitos

- Node.js 20+ (recomendado para Next.js 16)
- npm (ou gerenciador compativel)

## Como executar o projeto

1. Instale as dependencias:

```bash
npm install
```

2. Rode em modo de desenvolvimento:

```bash
npm run dev
```

3. Acesse no navegador:

`http://localhost:3000`

## Scripts disponiveis

- `npm run dev`: inicia o ambiente de desenvolvimento
- `npm run build`: gera build de producao
- `npm run start`: inicia a aplicacao em modo producao

## Observacoes

- Atualmente, apenas a rota de inicio (`/`) esta implementada no menu lateral.
- As demais secoes da sidebar exibem um modal de "Em desenvolvimento".
- Os dados do painel sao mockados; para integrar com API, o ponto inicial recomendado e substituir o consumo do `dashboard.json` pelos endpoints reais.
