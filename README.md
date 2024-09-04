# Nest Clean Architecture

![NestJS](https://img.shields.io/badge/NestJS-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Este repositório contém um projeto estruturado utilizando NestJS e a abordagem de Clean Architecture. O objetivo principal deste projeto é fornecer uma base sólida e escalável para o desenvolvimento de aplicações Node.js com NestJS, separando claramente as responsabilidades e aderindo aos princípios do SOLID.

## Índice

- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Configuração do Projeto](#configuração-do-projeto)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Testes](#testes)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Funcionalidades

Este projeto inclui as seguintes funcionalidades:

1. **Autenticação e Autorização**:
   - Implementação de JWT para autenticação.
   - Controle de acesso baseado em papéis (RBAC).

2. **Gestão de Usuários**:
   - CRUD de usuários com controle de permissões.
   - Reset de senha e atualização de perfil.

3. **Logger**:
   - Implementação de logging centralizado para monitoramento e debugging.
   
4. **Módulo de Tarefas**:
   - Gerenciamento de tarefas com estados (`pendente`, `em andamento`, `concluída`).
   - Atribuição de tarefas a usuários específicos.

5. **Validação e Serialização**:
   - Uso de DTOs (Data Transfer Objects) com validações robustas.
   - Serialização de respostas para garantir a consistência dos dados.

6. **Pipelines de Transformação de Dados**:
   - Utilização de pipes para transformação e validação de dados de entrada.

## Arquitetura

O projeto segue os princípios da Clean Architecture, que separam as responsabilidades em camadas distintas:

1. **Core**:
   - **Entities**: Objetos de domínio e suas regras de negócio.
   - **Use Cases (Interactors)**: Contêm a lógica de aplicação central.

2. **Application**:
   - **DTOs**: Objetos de transferência de dados para comunicação entre camadas.
   - **Services**: Implementação dos casos de uso, orquestrando as entidades e a comunicação com o mundo externo.

3. **Infrastructure**:
   - **Repositories**: Implementação das interfaces de persistência, conectando-se ao banco de dados.
   - **Providers**: Conexões com serviços externos, como APIs, provedores de autenticação, etc.

4. **Presentation**:
   - **Controllers**: Camada de apresentação, responsável por receber as requisições HTTP e retornar as respostas adequadas.

A separação em camadas visa garantir que as regras de negócio sejam independentes de detalhes de implementação, como frameworks, bancos de dados, e interfaces de usuário.

### Fluxo de Dados

1. **Request**: O controlador recebe a requisição HTTP.
2. **Validation**: O DTO valida e serializa os dados de entrada.
3. **Use Case Execution**: O serviço executa o caso de uso utilizando entidades e repositórios.
4. **Response**: O controlador retorna a resposta apropriada para o cliente.

## Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)**: Framework Node.js para construção de aplicações server-side eficientes e escaláveis.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática ao código.
- **[Docker](https://www.docker.com/)**: Plataforma para desenvolvimento, envio e execução de aplicações em containers.
- **[PrismaORM](https://www.prisma.io/)**: Prisma ORM unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion.
- **[JWT](https://jwt.io/)**: Implementação de JSON Web Tokens para autenticação.
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)**: Biblioteca para hashing de senhas.

## Configuração do Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/Glendson/nest-clean.git
   cd nest-clean
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
   ```
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. Configure o banco de dados usando Docker (se necessário):
   ```bash
   docker-compose up -d
   ```

## Como Rodar o Projeto

Após configurar o ambiente, você pode rodar o projeto usando o seguinte comando:

```bash
npm run start:dev
```

Isso iniciará o servidor em modo de desenvolvimento. A API estará disponível em `http://localhost:3333`.

## Testes

Este projeto inclui uma suíte de testes automatizados utilizando o Jest.

- Para rodar os testes, utilize o comando:
  ```bash
  npm run test
  ```

- Para rodar os testes com cobertura, utilize:
  ```bash
  npm run test:cov
  ```

## Contribuição

Se deseja contribuir para este projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma nova branch com sua feature ou correção de bug: `git checkout -b my-feature`.
3. Commit suas mudanças: `git commit -m 'Add my feature'`.
4. Envie para o repositório remoto: `git push origin my-feature`.
5. Abra um Pull Request detalhando suas alterações.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
