import { MailTrapMailProvider } from '../../providers/implementations/MailTrapMailProvider';
import { PostgresUserRepository } from '../../repositories/implementations/PostgresUserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserController } from './CreateUserController';

const mailTrapMailProvider = new MailTrapMailProvider();
const postgresUsersRepository = new PostgresUserRepository();

const createUserUsecase = new CreateUserUseCase(
    postgresUsersRepository,
    mailTrapMailProvider,
);

const createUserController = new CreateUserController(createUserUsecase);

export { createUserUsecase, createUserController };
