# API de Gerenciamento de Pessoas, Máscaras e Publicações

Esta é uma API desenvolvida em Node.js com Express e MongoDB para gerenciar pessoas, máscaras e publicações. A API oferece endpoints para criar, autenticar, atualizar e deletar registros de pessoas, além de gerenciar máscaras e publicações.

## Funcionalidades

- **Pessoas**
  - Criar uma nova pessoa
  - Autenticar uma pessoa
  - Atualizar informações de uma pessoa
  - Deletar uma pessoa
  - Upload de foto de perfil

- **Máscaras**
  - Criar uma nova máscara
  - Consultar uma máscara por número de caso
  - Atualizar uma máscara
  - Deletar uma máscara

- **Publicações**
  - Criar uma nova publicação

- **Gemini AI**
  - Consultar o modelo generativo Gemini da Google

## Endpoints

### Pessoas

- `POST /person/create` - Criar uma nova pessoa
- `POST /person/login` - Autenticar uma pessoa
- `GET /person/auth` - Obter informações de uma pessoa autenticada
- `PATCH /person/update` - Atualizar informações de uma pessoa
- `DELETE /person/delete` - Deletar uma pessoa
- `POST /person/upload` - Upload de foto de perfil

### Máscaras

- `POST /mask/create` - Criar uma nova máscara
- `GET /mask/:consultar_caso` - Consultar uma máscara por número de caso
- `PATCH /mask/:consultar_caso` - Atualizar uma máscara
- `DELETE /mask/:consultar_caso` - Deletar uma máscara

### Publicações

- `POST /publication/create` - Criar uma nova publicação

### Gemini AI

- `POST /gemini/consulta` - Consultar o modelo generativo Gemini da Google

## Configuração

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Crie um arquivo `.env` com as seguintes variáveis:
4. Inicie o servidor com `npm start`

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Multer
- Google Generative AI

## Autor

Samuel Crisóstomo