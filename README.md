# Seneca Project Structure

```bash
seneca/
│
├── src/
│   ├── core/
│   │   ├── config/
│   │   ├── dependencies/  # Injeção de dependências
│   │   ├── errors/
│   │   └── providers/
│   │
│   ├── modules/  # Cada módulo isolado
│   │   └── mail/
│   │       ├── domain/                 # Puro domínio (entidades, interfaces, regras)
│   │       │   ├── entities/
│   │       │   ├── repositories/       # Interfaces de repositório
│   │       │   └── use-cases/          # Implementações concretas dos casos de uso
│   │       └── presentation/
│   │           ├── controllers/        # Adaptadores (ex: Express)
│   │           └── dtos/               # Objetos de transferência de dados
│   │
│   ├── infrastructure/   # Implementações concretas de tecnologias
│   │   ├── database/
│   │   │   └── typeorm/  # Exemplo: Implementação do Repositório com TypeORM
│   │   ├── http/
│   │   │   ├── express/  # Configuração do Express
│   │   │   ├── routes/    # Rotas agrupadas por módulo
│   │   │   └── middlewares/
│   │   ├── queue/          # Nova pasta para filas
│   │   │   ├── queues/     # Definição das filas
│   │   │   └── workers/    # Workers para processar as filas
│   │   └── providers/    # Provedores externos globais (AWS, Email, Cache)
│   │
│   ├── shared/
│   │   ├── utils/        # Utilitários genéricos
│   │   ├── errors/       # Erros customizados
│   │   └── config/       # Configuração da aplicação
│   │
│   ├── di/               # Injeção de Dependências (container, configuração)
│
├── tests/
├── .env
└── server.ts
```

A estrutura de pastas que você apresentou segue os princípios do **SOLID** e uma arquitetura modular e limpa, o que é excelente para manter o código organizado, testável e escalável. Vou explicar cada pasta e arquivo para que você entenda o propósito de cada um:

---

### **Estrutura Geral**

#### **`src/`**
Contém todo o código-fonte da aplicação, organizado em pastas que separam as responsabilidades.

---

### **`core/`**
Aqui ficam os componentes centrais da aplicação, que são compartilhados entre os módulos.

- **`config/`**: Armazena as configurações globais da aplicação (ex: configurações de ambiente, conexões com bancos de dados, etc.).
- **`dependencies/`**: Responsável pela injeção de dependências. Aqui você define como os serviços e repositórios serão injetados nos módulos.
- **`errors/`**: Contém erros customizados que podem ser utilizados em toda a aplicação.
- **`providers/`**: Provedores globais, como serviços de autenticação, logging, etc.

---

### **`modules/`**
Cada módulo representa uma funcionalidade específica da aplicação (ex: `mail`, `user`, `auth`). A ideia é que cada módulo seja isolado e independente.

- **`mail/`**: Exemplo de um módulo.
  - **`domain/`**: Contém a lógica de negócio pura, sem dependências de frameworks ou bibliotecas externas.
    - **`entities/`**: Define as entidades do domínio (ex: `User`, `Email`).
    - **`repositories/`**: Interfaces que definem como os dados serão acessados (ex: `IUserRepository`).
    - **`use-cases/`**: Implementações concretas das regras de negócio (ex: `SendEmailUseCase`).
  - **`presentation/`**: Camada responsável por expor a funcionalidade para o mundo externo (ex: APIs).
    - **`controllers/`**: Adaptadores que lidam com requisições HTTP (ex: `MailController`).
    - **`dtos/`**: Objetos de transferência de dados (DTOs) usados para validar e transportar dados entre camadas.

---

### **`infrastructure/`**
Aqui ficam as implementações concretas de tecnologias e frameworks.

- **`database/`**: Implementações de acesso a banco de dados.
  - **`typeorm/`**: Exemplo de implementação de repositórios usando TypeORM.
- **`http/`**: Configurações relacionadas à camada HTTP.
  - **`express/`**: Configuração do framework Express.
  - **`routes/`**: Definição das rotas da aplicação, agrupadas por módulo.
  - **`middlewares/`**: Middlewares globais ou específicos para o Express.
- **`providers/`**: Implementações de provedores externos (ex: AWS, serviços de email, cache).

---

### **`shared/`**
Contém utilitários e recursos compartilhados entre os módulos.

- **`utils/`**: Funções utilitárias genéricas (ex: formatação de datas, validações).
- **`errors/`**: Erros customizados que podem ser usados em toda a aplicação.
- **`config/`**: Configurações compartilhadas (ex: configurações de ambiente, constantes globais).

---

### **`di/`**
Responsável pela configuração do container de injeção de dependências. Aqui você define como os serviços e repositórios serão injetados nos módulos.

---

### **`server.ts`**
Entry point da aplicação. Aqui você inicializa o servidor, configura middlewares, rotas e inicia o container de injeção de dependências.

---

### **`tests/`**
Contém os testes automatizados da aplicação. Você pode organizar os testes por módulo ou por tipo (unitários, integração, e2e).

---

### **`.env`**
Arquivo de configuração de variáveis de ambiente (ex: chaves de API, credenciais de banco de dados).

---

### **`server.ts` (na raiz)**
Arquivo principal que inicia a aplicação. Ele geralmente chama o `server.ts` dentro de `src/`.

---

### **Como os princípios SOLID são aplicados**

1. **Single Responsibility Principle (SRP)**:
   - Cada módulo e arquivo tem uma única responsabilidade. Por exemplo, o `domain/` cuida apenas da lógica de negócio, enquanto o `presentation/` lida com a exposição da funcionalidade.

2. **Open/Closed Principle (OCP)**:
   - As interfaces em `repositories/` permitem que você estenda o comportamento sem modificar o código existente. Por exemplo, você pode trocar a implementação do repositório sem alterar o caso de uso.

3. **Liskov Substitution Principle (LSP)**:
   - As implementações concretas (ex: repositórios em `infrastructure/`) seguem as interfaces definidas no domínio, garantindo que possam ser substituídas sem quebrar o sistema.

4. **Interface Segregation Principle (ISP)**:
   - As interfaces são específicas para cada necessidade. Por exemplo, uma interface de repositório não tem métodos desnecessários.

5. **Dependency Inversion Principle (DIP)**:
   - O uso de injeção de dependências (em `dependencies/` e `di/`) garante que módulos de alto nível (ex: casos de uso) dependam de abstrações, não de implementações concretas.

---

### **Fluxo de uma Requisição**

1. **Entrada**: Uma requisição HTTP chega ao `controller/` (ex: `MailController`).
2. **Validação**: O DTO é usado para validar os dados da requisição.
3. **Execução**: O controller chama o caso de uso correspondente (ex: `SendEmailUseCase`).
4. **Lógica de Negócio**: O caso de uso executa a regra de negócio, utilizando as entidades e interfaces de repositório.
5. **Acesso a Dados**: O repositório (ex: `TypeORMRepository`) acessa o banco de dados.
6. **Resposta**: O controller retorna a resposta ao cliente.

# Rodar migrations

```bash
 npm run migration --name=CreateUserTable
```

