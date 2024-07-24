# Users Management API

<div display="flex">
 <img src="https://img.shields.io/static/v1?label=node&message=18-alpine&color=green&style=for-the-badge&logo=node.js"/> 
 <img src="https://img.shields.io/static/v1?label=express&message=4.19.2&color=yellow&style=for-the-badge&logo=express"/> 
 <img src="https://img.shields.io/static/v1?label=mysql2&message=3.10.3&color=4479A1&style=for-the-badge&logo=mysql" alt="mysql2">
 <img src="https://img.shields.io/static/v1?label=swagger&message=5.0.1&color=darkgreen&style=for-the-badge&logo=swagger"/>
 <img src="https://img.shields.io/static/v1?label=docker&message=4.32.0&color=2496ED&style=for-the-badge&logo=docker" 
alt="Docker">
 <img src="https://img.shields.io/static/v1?label=bcrypt&message=5.1.1&color=blue&style=for-the-badge&logo=npm" alt="bcrypt"/>
 <img src="https://img.shields.io/static/v1?label=jsonwebtoken&message=9.0.2&color=black&style=for-the-badge&logo=npm" alt="jsonwebtoken"/>
 <img src="https://img.shields.io/static/v1?label=zod&message=3.23.8&color=purple&style=for-the-badge&logo=npm" alt="zod"/>
</div>

<img src="src/assets/swagger.png" alt="Swagger" width="100%"/>

## Sumário

- [Introdução](#introdução)
- [Instalação e execução](#instalação-e-execução)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Visão geral da API](#visão-geral-da-api)
- [Documentação do Swagger](#documentação-do-swagger)
- [Funcionalidades](#funcionalidades)
- [Endpoints](#endpoints)
    - [Login](#1-login)
    - [Registro](#2-registro)
    - [Atualizar perfil](#3-atualizar-perfil)
    - [Deletar conta](#4-excluir-conta)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Autor e Licença](#autor-e-licença)

## Introdução

Bem-vindo à documentação da Users Management API! Esta documentação fornece informações detalhadas sobre como usar a 
API, incluindo endpoints disponíveis, parâmetros aceitos, códigos de status e exemplos práticos. A documentação Swagger está disponível para uma visão mais interativa da API.

## Instalação e execução
#### Para instalar e executar o projeto, siga os passos abaixo:

1. Clone o repositório:
- Abra o terminal e execute o comando abaixo para clonar o repositório:

  ```bash
    git clone https://github.com/luizfelipe9627/users-management.git
  ```

2Defina as variáveis de ambiente:
- Siga as instruções do tópico [Variáveis de ambiente](#variáveis-de-ambiente) para definir as variáveis de ambiente no arquivo `.env`.

4. Instale o Docker:
- Para instalar o Docker, siga as instruções no link abaixo:

  ```bash
    https://docs.docker.com/get-docker/
  ```

5. Inicie as Imagens do Docker:

- Caso deseje rodar apenas o Node.JS, execute o comando abaixo:

  Para criar a imagem do Node.JS e iniciar o container:
    ```bash
      npm run docker:app
    ```

- Caso deseje rodar junto com o MySQL, execute o comando abaixo:

  Para criar a imagem do MySQL e iniciar o container:
    ```bash
      npm run docker:db
    ```

6. Acesse o servidor local:
- Acesse no terminal do editor de código ou no do Docker o link do servidor local, sendo a porta definida no arquivo `.env`:

  ```bash
    http://localhost:3000
  ```

## Variáveis de ambiente

- Caso deseje rodar o projeto em ambiente de desenvolvimento, copie o arquivo `.env.dev.example` e renomeie para `.env`. Os valores padrões não podem ser alterados, pois são necessários para o funcionamento correto do Docker com o MySQL.

  ```bash
    PORT=3001 # Para que o swagger funcione corretamente, a porta deve ser a definida por padrão.
    NODE_ENV=development # Para rodar com o nodemon, o valor dessa variável deve ser 'development'.
    MYSQL_HOST=db # Para rodar com o Docker Compose, o valor dessa variável deve ser passado pois é nome do serviço do container do MySQL.
    MYSQL_USER=root # Seu usuário local do seu MySQL.
    MYSQL_PASSWORD=root # Sua senha local do seu MySQL.
    MYSQL_DATABASE=users_management # Para rodar com o Docker Compose, o valor dessa variável deve ser 'users_management', pois é o nome do banco de dados que será criado no MySQL.
  ```

- Caso deseje rodar o projeto em ambiente de produção(deploy), copie o arquivo `.env.prod.example` e renomeie para `.env`. Todos os valores das variáveis de ambiente podem ser alterados, exceto o valor da variável `NODE_ENV`, que deve ser `production`.

  ```bash
    PORT=3001 # Para que o swagger funcione corretamente, a porta deve ser a definida por padrão.
    NODE_ENV=production # Para rodar com o node em ambiente de produção, o valor dessa variável deve ser 'production'.
    # O hostname ou endereço IP da instância MySQL na nuvem.

    # Preencha todas as variáveis a seguir com as configurações passadas pelo seu provedor do banco de dados.
    MYSQL_HOST=
    MYSQL_USER= 
    MYSQL_PASSWORD=
    MYSQL_DATABASE=
  ```

## Visão geral da API
#### A API foi projetada para ser fácil e simples de usar. Abaixo estão alguns pontos importantes para começar:

- **Base URL**: O endpoint base para todas as chamadas da API é [http://localhost:3001].
- **Autenticação**: Para atualizar ou deletar informações do usuário, a API requer um token de sessão e a senha da 
  conta.
- **Estrutura da resposta**: As respostas da API são retornadas em formato JSON. Exemplos de resposta são fornecidos 
  na documentação abaixo para cada endpoint.
- **Códigos de status**: A API retorna códigos de status padrão, como 200, 201 e 400, além de códigos personalizados 
  para erros específicos.

## Documentação do Swagger

Explore e teste a API de forma interativa usando a documentação local do Swagger. Acesse [link para a documentação do Swagger](http://localhost:3001) para obter uma visão visual completa dos endpoints, parâmetros e exemplos. Só é possível acessar a documentação do Swagger localmente após a instalação e execução do projeto.

## Funcionalidades

A Users Management API é um conjunto de endpoints que permite gerenciar informações de usuários. As principais funcionalidades são:

- **Login**: Permite que um usuário se autentique no sistema fornecendo seu e-mail e senha. Após uma autenticação bem-sucedida, um token de sessão é retornado, que deve ser incluído nas solicitações subsequentes para operações que requerem autenticação.
- **Registro**: Permite que novos usuários se registrem no sistema fornecendo um e-mail e uma senha. Após o registro, um token de sessão é gerado e retornado, permitindo que o usuário acesse as funcionalidades protegidas da API.
- **Alterar informações da conta**: Permite que um usuário autenticado atualize suas informações de perfil, como nome, e-mail e senha. É necessário fornecer um token de sessão válido e ao menos um campo de informação para atualização.
- **Deletar conta**: Permite que um usuário autenticado exclua sua conta do sistema. Para realizar essa operação, o usuário deve fornecer seu token de sessão e a senha da conta como forma de autenticação adicional.

## Recursos principais e Exemplos

### 1. Login

Autentica um usuário fornecendo o email e a senha. Retorna um token de sessão se as credenciais forem válidas.

- **Endpoint**: `/auth/login`
- **Método**: `POST`

**Exemplo de corpo da solicitação:**

```json
{
  "email": "teste@hotmail.com",
  "password": "teste@123"
}
```

**Exemplo de resposta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYs..."
}
```

### 2. Registro

Registra um novo usuário fornecendo o email e a senha. Retorna um token de sessão se o registro for bem-sucedido.

- **Endpoint**: `/auth/register`
- **Método**: `POST`

**Exemplo de corpo da solicitação:**

```json
{
  "name": "Testando",
  "email": "teste@hotmail.com",
  "password": "teste@123"
}
```

**Exemplo de resposta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYs..."
}
```

### 3. Atualizar perfil

Atualiza as informações do perfil do usuário fornecendo o email, nome e/ou senha. Pelo menos um campo deve ser preenchido.

- **Endpoint**: `/user/profile`
- **Método**: `PUT`

**Exemplo de corpo da solicitação:**

```json
{
  "id": 0,
  "name": "Lucas",
  "email": "lucas@hotmail.com",
  "password": "lucas@123",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYs..."
}
```

**Exemplo de resposta:**

```json
{
  "id": 0,
  "name": "Lucas",
  "email": "lucas@hotmail.com",
  "password": "$10$F.kzUfuFDhYXuJFeu5YHLusEi.TzXi3X02H...",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYs..."
}
```

### 4. Excluir conta

Deleta a conta do usuário. É necessário fornecer um token válido e a senha da conta. Após a exclusão, o usuário não estará mais presente na base de dados.

- **Endpoint**: `/user/delete`
- **Método**: `DELETE`

**Exemplo de corpo da solicitação:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "password": "senhaAtual@123"
}
```

**Exemplo de resposta:**

```json
{
  "message": "Perfil excluído com sucesso."
}
```

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/en/): Ambiente de execução JavaScript server-side.
- [Express](https://expressjs.com/): Framework web para Node.js.
- [MySQL2](https://www.npmjs.com/package/mysql2): Cliente MySQL para Node.js.
- [Swagger](https://swagger.io/): Framework de código aberto para APIs.
- [Docker](https://www.docker.com/): Plataforma de software que fornece contêineres.
- [Docker Compose](https://docs.docker.com/compose/): Ferramenta para definir e executar aplicativos Docker multi-container.
- [Nodemon](https://www.npmjs.com/package/nodemon): Ferramenta que monitora as alterações no código e reinicia automaticamente o servidor.
- [Dotenv](https://www.npmjs.com/package/dotenv): Módulo que carrega variáveis de ambiente de um arquivo `.env` para `process.env`.
- [Cors](https://www.npmjs.com/package/cors): Middleware para habilitar o CORS com várias opções.
- [Bcrypt](https://www.npmjs.com/package/bcrypt): Biblioteca para hashing de senhas e criptografia.
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Biblioteca para geração e verificação de JSON Web 
  Tokens (JWT).
- [Zod](https://www.npmjs.com/package/zod): Biblioteca para validação de esquemas e dados.

## Autor e Licença

Este projeto foi desenvolvido por [Luiz Felipe Silva](https://github.com/luizfelipe9627) e está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE.md) para mais detalhes.