  <p align="center">Sistema de cadastro de Companias</p>

## Descrição

Este é um backend desenvolvido em NestJS, utilizando TypeORM para manipulação de dados no banco de dados MySQL (ou MariaDB). O sistema fornece uma API RESTful para gerenciar empresas, com operações de criação, leitura, atualização e exclusão (CRUD).

## Rotas

### Endpoints RESTful:

- POST /auth/login: Gerar token para acesso ao sistema.
- POST /auth/singup: Cadastrar novo usuario no sistema.
- GET /companies: Lista todas as empresas.
- GET /companies/:id: Pegar dados de uma empresa especifica.
- POST /companies: Cadastra uma nova empresa.
- PUT /companies/:id: Atualiza uma empresa existente.
- DELETE /companies/:id: Exclui uma empresa.

## Validações

- Campos obrigatórios: Nome, CNPJ, endereço, telefone e e-mail.
- Validação de formato para CNPJ e e-mail.

## Testes

- Unitários: Cobrem os serviços e a lógica interna do backend.
- E2E: Testam a integração e o funcionamento dos endpoints.

## Deployment (DOCKER)

Certifique-se de ter o Docker e o Docker Compose instalados.
No diretório do projeto, execute:

```bash
docker-compose up --build
```

Acesse a API em http://localhost:3000.

## Deployment (LOCAL sem DOCKER)

Certifique-se de ter o Node.js, o MySQL e o npm instalados.
Configure o arquivo .env com as credenciais do banco de dados:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
```

Instale as dependências e inicie o sistema:

```bash
npm install
npm run start:dev
```

Acesse a API em http://localhost:3000.

## Testes

### Testes unitários:

```bash
npm run test
```

### Testes E2E:

```bash
npm run test:e2e
```
