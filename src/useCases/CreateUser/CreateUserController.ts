import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
    private createUserUserCase: CreateUserUseCase;

    constructor(createUserUserCase: CreateUserUseCase) {
        this.createUserUserCase = createUserUserCase;
    }

    async handle(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;
        try {
            await this.createUserUserCase.execute({ name, email, password });
            return res.status(201).json({ msg: 'ok' });
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message || 'Unexpected error' });
        }
    }
}
