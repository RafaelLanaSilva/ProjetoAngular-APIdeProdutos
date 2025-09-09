# 🌐 Frontend - APIdeProdutos

Aplicação frontend em **Angular 19** para consumir a [APIdeProdutos](../APIdeProdutos), oferecendo uma interface amigável para o gerenciamento de produtos.

---

## 🚀 Tecnologias Utilizadas

- [Angular 19](https://angular.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [Bootstrap 5](https://getbootstrap.com/) para estilização responsiva
- [RxJS](https://rxjs.dev/) para programação reativa
- [Angular CLI](https://angular.dev/cli)

---

## ⚙️ Configuração do Ambiente

### 1. Pré-requisitos
- [Node.js 20+](https://nodejs.org/)  
- [Angular CLI](https://angular.dev/cli) instalado globalmente:

```bash
npm install -g @angular/cli

2. Instalação de Dependências
No diretório do projeto Angular, execute:
npm install

Isso instalará todas as dependências listadas no package.json.

3. Bootstrap
O Bootstrap já está listado como dependência. Caso precise reinstalar:
npm install bootstrap

E adicione no arquivo angular.json em styles:

"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]

📌 Notas

Certifique-se que a APIdeProdutos está rodando local ou no docker antes de iniciar o frontend.
O Bootstrap garante responsividade e estilização rápida.
O projeto segue boas práticas do Angular, com separação de componentes, serviços e modelos.
