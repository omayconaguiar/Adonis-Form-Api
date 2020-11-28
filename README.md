# Adonis API application

<img
    src="https://i.ibb.co/dtShRdW/Captura-de-tela-2020-11-28-102053.gif"
    alt="Swagger Page of that application"
    title="Swagger Page of that application" />

## Setup

Install the adonis

```js
yarn add @adonisjs/cli
```

and manually run
```js
`yarn install`.
```

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Test

```js
adonis test
```

### Run 

```js
adonis server --dev
```

### ENV

Copie e cole as variáveis de ambiente em um arquivo .env.
Crie uma nova APP_KEY, com o comando:

```js
adonis key:generate
```

### Documentation 

Na pasta /docs se encontra a documentação com todos os endpoints, qual payload, headers e demais informações a serem enviadas em cada requisição.


### Business rules

A api cria questionários sobre determinado asssunto, e nesses questionários é anexado uma pergunta
com possíveis alternativas para ela, podendo somente ser criada por usuários admins.

O usuário comum pode acessar a pergunta, e respondê-la marcando somente as alternativas possíveis.
E depois o mesmo usuário consegue visualizar todas respostas que ele fez.

E qualquer pessoa consegue acessar a api de questionários existentes, perguntas pertencentes ao questionário e suas respectivas respostas.

Quase todas as etapas do processo requerem autenticação, ou seja, o usuário caso não tenha conta precisa se cadastrar e depois fazer login para utilizar seu token nas apis que necessitam de autorização.

Um usuário admin é o que possui is_admin como true ou 1 no banco de dados, podendo ser enviado opcionalmente na api de registro.
