import { Request, Response } from 'express';
import User from '../models/user.model';
import Group from '../models/group.model';
import { UserService } from '../services/user.service';
import { UserDto } from '../dto/user.dto';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email}: {email: string } = req.body;
      const { body } = req;
      const existingUser = await this.userService.getUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: 'Este e-mail já está sendo usado por outra conta.' });
        return;
      }

      const newUser = await this.userService.createUser(body);
      
      const userDto = new UserDto(
        newUser.name,
        newUser.email,
        newUser.createdAt ? newUser.createdAt : new Date()
      );

      res.status(201).json({ message: 'Usuário registrado com sucesso.', user: userDto });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      res.status(500).json({ message: 'Erro interno ao registrar usuário.' });
    }
  };

  public getUserGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId;

      const group = await this.userService.getUserGroup(userId);
      res.status(200).json(group);
    } catch (error) {
      console.error('Erro ao buscar o grupo do usuário:', error);
      res.status(500).json({ message: 'Erro interno ao buscar o grupo do usuário.' });
    }
  };
}

export default UserController;
