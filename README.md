# A tender christmas project

## Running the project
`docker-compose up --build`

*It might take a couple seconds for the client container to build

## API
I started using Mercado Livre's API since eBay was taking too long to approve my account. It is possible to get a key within minutes following [this link](https://developers.mercadolivre.com.br/pt_br/autenticacao-e-autorizacao/). Its search API doesn't have a sort attribute so i had to manually sort it.

I used `nodemailer` as mailing module and `email-templates` to use pug template engine. The mailing scheluder was built over `agenda` that uses mongo to manage jobs.

The API is based on a [layered architecture](https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf#architecture) for separation of concerns. However it is missing a refactoring of the service layer to use dependency injection for easier mocking and testing.

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
- AGENDA_COLLECTION: Name of the job collection(jobs)
- AGENDA_PROCESS_INTERVAL: Human readable interval of agenda checkings (10 seconds)
- AGENDA_CONCURRENCY: Max concurrent jobs(10)
- AGENDA_LOCK_TIME: Default email lock time(4000)


## Client
The client side file organization is based on a [model](https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145) suggested by Charles Stover, the data layer is managed with `redux` and styling was made using `styled-components` since my docker container didn't like `node-sass` lib.