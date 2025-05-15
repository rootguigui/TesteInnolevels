# API de Teste Global Hitss

Este projeto é uma API desenvolvida com Node.js, TypeScript e MongoDB.

## Estrutura de Pastas

```
.
├── src/                    # Código fonte da aplicação
├── dist/                   # Código compilado
├── __test__/              # Testes da aplicação
├── node_modules/          # Dependências do projeto
├── Dockerfile             # Configuração do Docker
├── docker-compose.yml     # Configuração do Docker Compose
├── package.json           # Dependências e scripts do projeto
├── tsconfig.json          # Configuração do TypeScript
├── jest.config.js         # Configuração do Jest
└── babel.config.js        # Configuração do Babel
```

## Como Executar com Docker Compose

1. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina

2. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_DIRETÓRIO]
```

3. Execute o projeto com Docker Compose:
```bash
docker-compose up --build
```

A aplicação estará disponível em `http://localhost:3000`

### Detalhes da Configuração

- A API roda na porta 3000
- MongoDB roda na porta 27017
- Credenciais do MongoDB:
  - Usuário: globalhitss_teste
  - Senha: globalhitss_teste
  - Database: teste_globalhitss

### Comandos Úteis

- Para parar os containers:
```bash
docker-compose down
```

- Para ver os logs:
```bash
docker-compose logs -f
```
