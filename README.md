# A tender christmas project

## Running the project
`docker-compose up --build`

*It might take a couple seconds for the client container to build

## API
I started using Mercado Livre's API since eBay was taking too long to approve my account. It is possible to get a key within minutes following [this link](https://developers.mercadolivre.com.br/pt_br/autenticacao-e-autorizacao/)

### Env variables
- DOCKER_CONTAINER: Container name (docker-node-container)
- API_PORT: Port where API will be listening(3000)
- MONGODB_PORT: Port for MongoDB(27017)
- MELI_CLIENT_ID: ID from linked MELI APP
- MELI_CLIENT_SECRET: Secret from linked MELI APP
- MAIL_HOST: Email service host(smtp.mailtrap.io)
- MAIL_PORT
- MAIL_USER
- MAIL_PASSWORD
- MAIL_FROM: Email sender address