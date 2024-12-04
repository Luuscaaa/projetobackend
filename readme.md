# Relatório de Documentação de Software: Sistema de Gerenciamento de Livraria - Bookstore

---

## 1. Introdução

### 1.1 Visão Geral
Este documento apresenta a documentação do sistema de gerenciamento de uma livraria, desenvolvido com o padrão de arquitetura MVC (Model-View-Controller). O sistema é projetado para gerenciar livros de maneira eficiente, incluindo funcionalidades de cadastro, consulta, atualização e exclusão de livros (CRUD completo), além da autenticação de usuários.

### 1.2 Objetivo do Sistema
O principal objetivo do sistema é proporcionar uma plataforma segura e eficiente para gerenciar o catálogo de livros de uma livraria, com autenticação de usuários e validações robustas para garantir a integridade dos dados e a segurança das operações.

### 1.3 Escopo
O sistema abrange as seguintes funcionalidades:
- Registro e autenticação de usuários com validação de dados.
- Cadastro, consulta, atualização e exclusão de livros.
- Busca de livros filtrando por título ou autor.
- Arquitetura modular para facilitar a manutenção e escalabilidade.

---

## 2. Arquitetura do Sistema

### 2.1 Padrão de Arquitetura
O sistema segue o padrão MVC (Model-View-Controller), que organiza o código em três componentes principais:
- Model: Responsável pela lógica de negócios e pela comunicação com o banco de dados.
- View: Gerencia a interface com o usuário, apresentando os dados de forma estruturada.
- Controller: Atua como intermediário entre o Model e a View, processando as requisições e coordenando as respostas.

### 2.2 Estrutura Modular
O sistema foi desenvolvido de forma modular para garantir organização, escalabilidade e facilidade de manutenção. As validações de entrada são centralizadas em uma camada de helpers, promovendo consistência e reutilização de lógica de validação em todo o sistema.

---

## 3. Funcionalidades do Sistema

### 3.1 Autenticação de Usuários
- Cadastro de Usuários: Permite o registro de novos usuários com validação de nome, email e senha.
- Login de Usuários: Verificação de credenciais e geração de token JWT para autenticação segura.
- Autenticação Segura: Proteção das informações de login e controle de acesso por meio de tokens.

### 3.2 Gerenciamento de Livros
- Cadastro de Livros: Inclusão de novos livros com validação de dados obrigatórios (título, autor e preço).
- Consulta de Livros: Busca de livros por título ou autor, com a possibilidade de exibir todos os livros cadastrados.
- Atualização de Livros: Alteração das informações de livros já cadastrados.
- Exclusão de Livros: Remoção de livros do catálogo, com confirmação para evitar exclusões acidentais.

---

## 4. Validações Implementadas

### 4.1 Objetivo das Validações
As validações implementadas têm como objetivo garantir a consistência e a integridade dos dados inseridos no sistema. Elas ajudam a prevenir entradas incorretas ou maliciosas, assegurando que apenas dados válidos sejam aceitos pelo sistema.

### 4.2 Principais Validações
1. Validação de Usuários
   - O nome do usuário deve conter apenas letras e espaços, com no mínimo três caracteres.
   - O email deve seguir o formato padrão (ex: exemplo@dominio.com).
   - A senha deve ser forte, contendo pelo menos oito caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.

2. Validação de Livros
   - O título do livro deve possuir no mínimo três caracteres.
   - O autor do livro deve ser um nome válido (sem números ou caracteres especiais).
   - O preço do livro deve ser maior que zero.

---

## 5. Requisitos do Sistema

### 5.1 Requisitos Funcionais
- RF001: O sistema deve permitir o registro de novos usuários, com validação de dados.
- RF002: O sistema deve permitir login de usuários registrados com geração de token JWT para autenticação.
- RF003: O sistema deve validar os dados inseridos durante o registro de usuários e o cadastro de livros.
- RF004: O sistema deve permitir o cadastro de livros com título, autor e preço.
- RF005: O sistema deve permitir a consulta de livros, com opções de filtro por título ou autor.
- RF006: O sistema deve permitir a atualização dos dados de livros existentes.
- RF007: O sistema deve permitir a exclusão de livros do catálogo.

### 5.2 Requisitos Não Funcionais
- RNF001: O sistema deve garantir a segurança das senhas armazenadas por meio de criptografia (hashing).
- RNF002: O sistema deve utilizar tokens seguros (JWT) para autenticação de usuários.
- RNF003: O sistema deve seguir as melhores práticas de proteção de dados e garantir conformidade com a LGPD (Lei Geral de Proteção de Dados).
- RNF004: O sistema deve ser capaz de atender até 50 requisições simultâneas sem degradação perceptível.
- RNF005: O sistema deve fornecer mensagens de erro claras e compreensíveis para entradas inválidas, promovendo uma boa experiência de uso.

---

## 6. Análise de Riscos

### 6.1 Riscos Técnicos
- RT001: Validação Insuficiente
  - Risco: Dados inválidos podem comprometer a integridade do banco de dados.
  - Mitigação: Implementação de validações rigorosas em todos os pontos de entrada de dados e testes automatizados.

- RT002: Vulnerabilidades de Segurança
  - Risco: Falhas na autenticação e armazenamento de dados podem expor informações sensíveis.
  - Mitigação: Uso de criptografia de senhas e tokens seguros (JWT) para autenticação.

### 6.2 Riscos de Negócio
- RN001: Dificuldade de Uso
  - Risco: Usuários podem abandonar o sistema se encontrarem dificuldades na interface.
  - Mitigação: Realização de testes de usabilidade regulares, além de melhorias contínuas com base no feedback dos usuários.

---

## 7. Conclusão
O sistema de gerenciamento de livraria foi desenvolvido com foco na segurança, validação de dados e organização modular. A arquitetura baseada no padrão MVC garante que o projeto seja escalável e de fácil manutenção. As funcionalidades CRUD, validações eficientes e a segurança do sistema proporcionam uma experiência confiável e eficiente para os usuários.

---

## 8. Link do Front-End
[Link para o Repositório do Front-End]