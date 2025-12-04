---

# 🪙 Sistema de Moeda Estudantil

> [!NOTE]
> Sistema de gamificação e mérito estudantil desenvolvido para distribuir moedas virtuais de professores para alunos, permitindo a troca por vantagens reais em empresas parceiras.

<table>
  <tr>
    <td width="800px">
      <div align="justify">
        O <b>Sistema de Moeda Estudantil</b> é uma aplicação Full-Stack desenvolvida como parte da disciplina de <b>Laboratório de Desenvolvimento de Software</b> da <b>PUC Minas</b>. O projeto visa estimular o reconhecimento do mérito acadêmico através de uma moeda virtual. Professores podem premiar alunos por bom comportamento e participação, e os alunos, por sua vez, podem trocar essas moedas por descontos ou produtos em empresas parceiras cadastradas. O sistema conta com notificações por e-mail, geração de cupons e histórico transparente de transações.
      </div>
    </td>
    <td>
      <div align="center">
        <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-scholarship-university-flaticons-lineal-color-flat-icons-2.png" alt="Logo do Projeto" width="120px"/>
      </div>
    </td>
  </tr>
</table>

---

## 🚧 Status do Projeto

![Versão](https://img.shields.io/badge/Versão-v1.0.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-007ec6?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 📚 Índice
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Instalação e Execução](#-instalação-e-execução)
  - [Pré-requisitos](#pré-requisitos)
  - [Variáveis de Ambiente](#-variáveis-de-ambiente)
  - [Execução com Docker](#-execução-local-completa-com-docker-compose)
  - [Execução Manual](#-como-executar-manualmente)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Autores](#-autores)
- [Licença](#-licença)

---

## 📝 Sobre o Projeto

O sistema foi criado para resolver a falta de engajamento em atividades extracurriculares e em sala de aula. Através de um sistema de recompensas:

1.  **Professores** recebem uma cota semestral de moedas para distribuir.
2.  **Alunos** acumulam saldo ao receberem moedas.
3.  **Empresas Parceiras** cadastram vantagens (produtos/descontos).
4.  **Troca:** O aluno utiliza o saldo para resgatar um cupom, gerando um código único para validação na empresa.

O projeto implementa conceitos de **Arquitetura em Camadas**, **API RESTful**, **Segurança com JWT** e **Single Page Application (SPA)**.

---

## ✨ Funcionalidades Principais

- 🔐 **Autenticação e Autorização:** Login seguro com Spring Security e JWT para Alunos, Professores e Empresas.
- 💸 **Transação de Moedas:** Professores podem enviar moedas para alunos com uma mensagem de reconhecimento.
- 🎁 **Gerenciamento de Vantagens:** Empresas parceiras podem cadastrar, editar e listar benefícios com imagens e descrições.
- 🛒 **Resgate de Prêmios:** Alunos podem visualizar catálogo e trocar moedas por vantagens.
- 📨 **Notificações por E-mail:** Envio automático de e-mail (via SMTP) para alunos ao receberem moedas e para empresas/alunos na geração de cupons.
- 📜 **Histórico de Transações:** Extrato completo de envio, recebimento e trocas para todos os usuários.
- 📊 **Dashboard:** Visão geral de saldo e atividades recentes.

---

## 🛠 Tecnologias Utilizadas

### 💻 Front-end (`/Codigo/Front`)
* **Framework:** React + Vite
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS + Shadcn/UI
* **Gerenciamento de Pacotes:** Bun (ou npm/yarn)
* **Comunicação:** Axios

### 🖥️ Back-end (`/Codigo/Back`)
* **Framework:** Spring Boot 3
* **Linguagem:** Java 17
* **Segurança:** Spring Security + JWT
* **Banco de Dados:** PostgreSQL (Produção/Docker) / H2 (Testes)
* **ORM:** Spring Data JPA (Hibernate)
* **Documentação:** Swagger/OpenAPI (se implementado)

### ⚙️ DevOps & Infraestrutura
* **Containerização:** Docker e Docker Compose

---

## 🏗 Arquitetura

O sistema segue uma arquitetura em camadas (Controller, Service, Repository), separando claramente o Frontend do Backend.

### Diagramas do Projeto

| Diagrama de Comunicação | Diagrama de Classes |
| :---: | :---: |
| <img src="./Codigo/Diagrama-Comunicacao.png" alt="Diagrama de Comunicação" width="400px"> | [Ver PDF do Diagrama de Classes](./Class%20diagram.pdf) |

> Os diagramas completos, incluindo Casos de Uso e Sequência, podem ser encontrados na pasta `/docs` ou na raiz do código fonte.

---

## 🔧 Instalação e Execução

### Pré-requisitos
* **Java JDK 17+**
* **Node.js 18+** (ou Bun)
* **Docker** (Opcional, mas recomendado para o Banco de Dados)
* **Maven**

### 🔑 Variáveis de Ambiente

#### 1. Back-end (`/Codigo/Back/sistema-de-moeda/src/main/resources/application.properties`)
Configure as credenciais do banco e de e-mail. Para rodar localmente sem Docker, altere para o seu PostgreSQL local ou use H2.

```properties
# Exemplo de configuração
spring.datasource.url=jdbc:postgresql://localhost:5432/moeda_estudantil
spring.datasource.username=postgres
spring.datasource.password=sua_senha
spring.mail.host=smtp.gmail.com
spring.mail.username=seu_email@gmail.com
spring.mail.password=sua_senha_de_app
````

#### 2 Front-end (React, Vite)

Crie um arquivo **`.env`** na raiz da pasta `/frontend` e use o prefixo `VITE_` (ou `REACT_APP_` se estiver usando CRA) para expor as variáveis ao *bundle* da aplicação.

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `VITE_API_URL` | URL base do endpoint do Backend Spring Boot. | `http://localhost:8080/api` |

---

### 🐳 Execução Local Completa com Docker Compose

A maneira mais simples de rodar todo o ecossistema (Banco de Dados + Back-end + Front-end) é utilizando o Docker Compose.

1. Certifique-se de que o **Docker** e o **Docker Compose** estão instalados e rodando.
2. Navegue até a raiz do projeto (onde está o arquivo `docker-compose.yml`).
3. Execute o seguinte comando no terminal:

```bash
docker-compose up --build
````

### ⚡ Como Executar Manualmente

Caso prefira rodar os serviços individualmente em terminais separados (sem Docker para as aplicações), siga os passos abaixo.

#### Pré-requisitos
* **Java JDK 17+**: Necessário para executar o Back-end.
* **Node.js 18+**: Necessário para executar o Front-end.
* **Banco de Dados**: É necessário ter uma instância do **PostgreSQL** rodando localmente na porta `5432` com um banco de dados chamado `moeda_estudantil`.
  * *Alternativa:* Caso não tenha o PostgreSQL instalado, você pode subir apenas o banco com Docker:
    ```bash
    docker run --name pg-moeda -e POSTGRES_PASSWORD=sua_senha -e POSTGRES_DB=moeda_estudantil -p 5432:5432 -d postgres:16
    ```
  * *Configuração:* Verifique se as credenciais no arquivo `Codigo/Back/sistema-de-moeda/src/main/resources/application.properties` correspondem ao seu banco local.

---

## 📂 Estrutura de Pastas

Descreva o propósito das pastas principais.

```
.
├── .gitignore                   # 🧹 Ignora arquivos/pastas não versionadas (.env, node_modules, target, etc.).
├── .vscode/                     # ⚙️ Configurações de ambiente da IDE (opcional).
├── .github/                     # 🤖 CI/CD (Actions), templates de Issues e Pull Requests.
├── README.md                    # 📘 Documentação principal do projeto.
├── CONTRIBUTING.md              # 🤝 Guia de contribuição.
├── LICENSE                      # ⚖️ Licença do projeto.
├── docker-compose.yml           # 🐳 Orquestração dos containers (front/back/db/etc).
├── docker-compose.override.yml  # 🐳 Configurações extras apenas para desenvolvimento.
│
├── /frontend                    # 📁 Aplicação React
│   ├── .env.example             # 🧩 Variáveis de ambiente do Front-end.
│   ├── Dockerfile               # 🐳 Docker build do Front-end.
│   ├── .eslintrc.js             # ✨ Regras do ESLint.
│   ├── .prettierrc              # 🎨 Configuração do Prettier.
│   ├── /public                  # 📂 Arquivos estáticos e index.html.
│   ├── /src                     # 📂 Código-fonte React
│   │   ├── /components          # 🧱 Componentes reutilizáveis (UI).
│   │   ├── /pages               # 📄 Páginas/rotas da aplicação.
│   │   ├── /services            # 🔌 Serviços e chamadas HTTP.
│   │   ├── /hooks               # 🎣 Hooks personalizados.
│   │   ├── /styles              # 🎨 Estilos globais, temas, Design System.
│   │   ├── /assets              # 🖼️ Recursos estáticos importados
│   │   │   ├── /images          # 🖼️ Imagens.
│   │   │   ├── /icons           # 💡 Ícones.
│   │   │   └── /fonts           # ✒️ Fontes personalizadas.
│   │   └── /utils               # 🛠️ Funções utilitárias.
│   ├── package.json             # 📦 Dependências e scripts.
│   └── yarn.lock / package-lock.json # 🔒 Lockfile das dependências.
│
├── /backend                     # 📁 Aplicação Spring Boot
│   ├── .env.example             # 🧩 Variáveis de ambiente do Back-end.
│   ├── Dockerfile               # 🐳 Docker build do Back-end.
│   │
│   ├── /src/main/java           # 📂 Código-fonte Java
│   │   └── /com/exemplo/sistema-de-moeda
│   │       ├── /controller      # 🎮 Endpoints REST.
│   │       ├── /service         # ⚙️ Regras e lógica de negócio.
│   │       ├── /repository      # 🗄️ Repositórios (JPA/Hibernate).
│   │       ├── /model           # 🧬 Entidades persistentes (JPA).
│   │       ├── /email           # 📦 Template do e-mail a ser enviado, etc.
│   │       ├── /enums           # 🌐 Classes do tipo enum.
│   │       ├── /dto             # ✉️ Data Transfer Objects.
│   │       ├── /config          # 🔧 Configurações gerais (DB, Swagger, CORS, etc.).
│   │       ├── /exception       # 💥 Exceptions e handlers globais.
│   │
│   ├── /src/main/resources      # 📂 Recursos do Spring Boot
│   │   ├── application.yml         # ⚙️ Configuração principal da aplicação
│   │   ├── application-dev.yml     # 🧪 Configurações específicas do ambiente de DESENVOLVIMENTO
│   │   ├── application-prod.yml    # 🚀 Configurações específicas para PRODUÇÃO
│   │   ├── application-test.yml    # 🧪 Configurações usadas nos testes automatizados
│   │   ├── /static                # 🌐 Arquivos estáticos (HTML/CSS/JS).
│   │   ├── /templates             # 🖼️ Templates Thymeleaf/Freemarker.
│   │
│   ├── /src/test/java            # 🧪 Testes unitários e de integração.
│   └── pom.xml / build.gradle    # 🛠️ Build e dependências.
│
├── /scripts                      # 📜 Scripts de automação
│   ├── dev.sh                    # 🚀 Ambiente de desenvolvimento completo.
│   ├── build_all.sh              # 🛠️ Build geral (front + back).
│   └── deploy.sh                 # ☁️ Deploy em produção/homologação.
│
├── /docs                         # 📚 Documentação, arquitetura, modelos C4, Swagger/OpenAPI.
└── /tests                        # 🧪 Testes End-to-End (Cypress/Playwright).
```
