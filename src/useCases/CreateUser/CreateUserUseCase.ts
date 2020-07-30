import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { IMailProvider } from '../../providers/IMailProvider';

export class CreateUserUseCase {
    private usersRepository: IUsersRepository;

    private mailProvider: IMailProvider;

    constructor(
        usersRepository: IUsersRepository,
        mailProvider: IMailProvider,
    ) {
        this.usersRepository = usersRepository;
        this.mailProvider = mailProvider;
    }

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExsists = await this.usersRepository.findByEmail(
            data.email,
        );
        if (userAlreadyExsists) {
            throw new Error('User already exists');
        }
        if (!(await this.usersRepository.checkPassword(data.password))) {
            throw new Error('Invalid password');
        }
        const user = new User(data);
        await this.usersRepository.save(user);
        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'equipe do meu app',
                email: 'equipe@email.com',
            },
            subject: 'seja bem-vindo a plataforma',
            body: '<p>você já pode fazer login na plataforma</p>',
        });
    }
}
