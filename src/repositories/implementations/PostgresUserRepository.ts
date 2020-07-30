import { IUsersRepository } from '../IUsersRepository';
import { User } from '../../entities/User';

export class PostgresUserRepository implements IUsersRepository {
    private users: User[] = [];

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);
        return user;
    }

    async checkPassword(password: string): Promise<boolean> {
        if (password.length < 6) {
            return false;
        }
        return true;
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }
}
