
<div align="center">
  <img src="https://i.imgur.com/WdGink9.png" alt="Logo do BJJ Academy" width="220" />

  <h1>BJJ Academy 🥋</h1>
  <p>Plataforma de gerenciamento para academias de Jiu-Jitsu Brasileiro.</p>

  <p align="center">
    <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow" alt="Status do Projeto" />
    <img src="https://img.shields.io/github/license/seu-usuario/bjj-academy" alt="Licença" />
    <img src="https://img.shields.io/badge/react-18.x-blue" alt="React Version" />
    <img src="https://img.shields.io/badge/Supabase-PostgreSQL-green" alt="Supabase" />
  </p>
</div>

---

## 🖼️ Preview da Interface

- 🧱 **Em Breve**
<img src="https://via.placeholder.com/800x400.png?text=Screenshot+da+Aplicacao+BJJ+Academy" alt="Preview da Aplicação" />

---

## 🚀 Tecnologias

- ⚛️ **React** – Interface moderna e responsiva
- 🔐 **Supabase** – Autenticação e banco de dados PostgreSQL
- 📦 **Context API** – Gerenciamento global de autenticação
- 🧱 **Componentização** – Arquitetura organizada com componentes reutilizáveis
- 📁 **Estrutura MVC** – Separação clara entre lógica e visual

---

## 🔐 Funcionalidades Atuais

No momento, o projeto está em fase inicial de desenvolvimento. Já implementamos:

- ✅ **Login com e-mail e senha** (autenticação conectada ao Supabase)
- ✅ **Estrutura base com React + Supabase**
- ✅ **Algumas telas iniciais para testes de UI**

> ⚠️ Nesta versão `v0.0.1`, o foco está na estruturação da base do sistema de autenticação.

---

## 🎯 Objetivos da Versão `v0.0.1`

Nesta fase, estamos trabalhando nas seguintes funcionalidades essenciais:

- [x] Tela de login
- [ ] Tela de cadastro de usuário (instrutores/alunos)
- [ ] Tela de redefinição de senha
- [ ] Validação de sessão ativa (usuário logado permanece conectado)
- [ ] Página inicial (home) com layout base do perfil do usuário

> 💡 Após a finalização do fluxo de autenticação, iniciaremos a construção da **primeira versão da tela inicial**, que servirá como base para o restante da aplicação.

---

## 🚀 Funcionalidades Futuras (Roadmap)

Estas são funcionalidades planejadas para as próximas versões do projeto:

### 🔧 Funcionalidades Core
- Cadastro e gerenciamento de alunos
- Estrutura de graduações (faixas, categorias etárias e hierarquias)
- Criação e organização de turmas
- Diferenciação de acesso entre instrutor e aluno
- Interface amigável e voltada para a realidade do BJJ

### 🧠 Planejamento de Expansão
- ✅ Painel administrativo com permissões
- 📊 Dashboard com métricas da academia
- 📱 Interface responsiva para mobile
- 🔔 Sistema de notificações (promoções, eventos, vencimentos)

---

## 📦 Stack Utilizada

- **Frontend:** React.js
- **Backend as a Service:** Supabase (PostgreSQL, Auth, Storage)
- **Gerenciamento de estado/contexto:** Context API
- **Estilização:** (futuramente) TailwindCSS / ShadCN UI

---

## 📦 Scripts

```bash
npm install       # Instala as dependências
npm start         # Inicia o app em modo de desenvolvimento
npm test          # Executa os testes automatizados
npm run build     # Cria a build de produção
npm run eject     # Expõe configurações internas (irreversível)
```
---

## 📁 Estrutura de Diretórios

```
BJJ-ACADEMY/
│
├── node_modules/              # Dependências instaladas via npm
│
├── public/                    # Arquivos públicos acessíveis diretamente pelo navegador
│
├── src/                       # Diretório principal de código-fonte da aplicação
│   ├── assets/                # Recursos estáticos da aplicação
│   │   ├── icons/             # Ícones utilizados na UI
│   │   └── images/            # Imagens usadas na aplicação
│   │
│   ├── components/            # Componentes reutilizáveis da interface
│   │   ├── common/            # Componentes genéricos (botões, inputs, etc)
│   │   ├── features/          # Componentes voltados para funcionalidades específicas
│   │   └── layout/            # Componentes relacionados ao layout (navbar, footer, etc)
│   │
│   ├── contexts/              # Contextos React para gerenciamento de estado global
│   │   └── AuthContext.js     # Contexto de autenticação do usuário
│   │
│   ├── hooks/                 # Hooks customizados React
│
│   ├── models/                # Modelos de dados utilizados no frontend
│   │   └── userModel.js       # Modelo de dados para o usuário
│
│   ├── services/              # Serviços de integração com APIs ou back-end
│   │   ├── authService.js     # Lógica de autenticação
│   │   └── supabaseClient.js  # Instância do cliente Supabase
│
│   ├── utils/                 # Funções utilitárias auxiliares
│
│   ├── views/                 # Páginas principais da aplicação
│   │   ├── HomeView.js        # Página inicial
│   │   ├── LoginView.js       # Página de login
│   │   └── RegisterView.js    # Página de cadastro
│
│   ├── App.css                # Estilos globais da aplicação
│   ├── App.js                 # Componente raiz da aplicação
│   ├── App.test.js            # Testes da aplicação
│   ├── index.css              # Estilos da página index
│   ├── index.js               # Ponto de entrada principal (renderização do React)
│   ├── logo.svg               # Logo da aplicação
│   ├── reportWebVitals.js     # Medição de performance (opcional)
│   ├── routes.js              # Definição das rotas da aplicação
│   └── setupTests.js          # Configuração para testes
│
├── .gitattributes             # Configurações específicas do Git
├── .gitignore                 # Arquivos/diretórios ignorados pelo Git
├── package.json               # Dependências e scripts do projeto
├── package-lock.json          # Versões exatas das dependências instaladas
├── README.md                  # Documentação principal do projeto
└── README.old.md              # Versão anterior do README (backup ou histórico)

```

---

> Projeto em desenvolvimento contínuo. Feedbacks e contribuições são bem-vindos! 👊

---

## 📄 Licença

Este projeto está sob uma licença personalizada de uso privado.  
© 2025 Bruno Alves Franca — Todos os direitos reservados.

Entre em contato para uso comercial ou autorização: [contatobalvesfranca@gmail.com]

---

## 👨‍💻 Autor

Feito com 💙 por [Bruno Alves Franca](https://github.com/balvesfranca)  
📸 Instagram: [@balvesfranca](https://instagram.com/balvesfranca)
