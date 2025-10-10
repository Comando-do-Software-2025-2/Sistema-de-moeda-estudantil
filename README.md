# 💰 Sistema de Moeda Estudantil

> Projeto desenvolvido como parte do **Laboratório de Desenvolvimento de Software (Release 1)** — Curso de **Engenharia de Software**.

## 🧩 Sobre o Projeto

O **Sistema de Moeda Estudantil** tem como objetivo incentivar o mérito acadêmico por meio de uma **moeda virtual**.  
Professores podem distribuir moedas aos alunos como forma de reconhecimento, e os alunos podem trocá-las por **produtos, descontos ou benefícios** em **empresas parceiras**.

O sistema promove a valorização do bom desempenho estudantil, integrando alunos, professores e empresas em um ecossistema de recompensas.

---

## 🚀 Funcionalidades Principais

### 👨‍🏫 Professores
- Recebem **1.000 moedas por semestre** (saldo acumulável).
- Podem **enviar moedas** aos alunos, indicando o **motivo do reconhecimento**.
- Possuem **saldo e extrato de transações**.

### 🎓 Alunos
- Realizam **cadastro** informando dados pessoais e instituição.
- **Recebem moedas** e são notificados por **e-mail**.
- Consultam **saldo e histórico de transações**.
- Podem **trocar moedas por vantagens** (descontos, produtos, etc).

### 🏢 Empresas Parceiras
- Cadastram-se no sistema com **nome, descrição e vantagens oferecidas**.
- Cada vantagem possui **descrição, foto e custo em moedas**.
- Recebem **notificação por e-mail** quando um aluno realiza um resgate.

---

## 🔐 Autenticação

Todos os usuários (alunos, professores e empresas) possuem **login e senha**, com processo de **autenticação obrigatória** para acesso às funcionalidades do sistema.

---

## 🏗️ Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)**, com as seguintes etapas de desenvolvimento:

### 🧠 Lab03S01 — Modelagem
- Diagrama de Casos de Uso  
- Histórias de Usuário  
- Diagrama de Classes  
- Diagrama de Componentes  

### 💾 Lab03S02 — Persistência e CRUDs Iniciais
- Modelo ER e estratégia de acesso ao banco de dados (ORM / DAO)  
- Implementação dos **CRUDs de Aluno e Empresa Parceira** (versão inicial)  

### 💻 Lab03S03 — Versão Final
- Finalização dos CRUDs  
- Implementação da **arquitetura do sistema e camada de persistência**  
- Apresentação técnica e tutorial das tecnologias utilizadas  

---

## 🧮 Tecnologias e Ferramentas

- **Java / Spring Boot** → back-end e camada de persistência  
- **React / HTML / CSS / JS** → front-end  
- **PostgreSQL** → banco de dados  
- **Hibernate / JPA** → ORM  
- **Maven** → gerenciamento de dependências  
- **GitHub** → controle de versão  
- **Postman** → testes de API  

---

## 📬 Notificações

- Alunos recebem **e-mails de reconhecimento** ao ganhar moedas.  
- Empresas recebem **e-mails de validação de resgates**, contendo **código de conferência**.  
- Alunos recebem **cupom digital** para utilizar as vantagens.

---

## 👥 Equipe

| Integrante | Função | Contato |
|-------------|--------|----------|
| [Seu Nome Aqui] | Desenvolvedor(a) | [seuemail@exemplo.com] |
| [Integrante 2] | Desenvolvedor(a) | — |
| [Integrante 3] | Designer / Analista | — |

---

## 📚 Professor Responsável

**João Paulo Carneiro Aramuni**  
Disciplina: Laboratório de Desenvolvimento de Software  
Curso: Engenharia de Software

---

## 🏁 Status do Projeto

> **Release 1 — Em desenvolvimento**  
> Versão inicial do sistema com modelagem, persistência e primeiros CRUDs.

---

