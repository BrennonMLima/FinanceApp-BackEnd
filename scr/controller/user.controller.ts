import { Request, Response } from 'express';
import User from '../models/user.model'
import Group from '../models/group.model'
import UserService from '../services/user.service';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await this.userService.getUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: 'Este e-mail já está sendo usado por outra conta.' });
        return;
      }

      const newUser = await this.userService.createUser(name, email, password);

      res.status(201).json({ message: 'Usuário registrado com sucesso.', user: newUser });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      res.status(500).json({ message: 'Erro interno ao registrar usuário.' });
    }
  };

  public getUserGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId;

      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado.' });
        return;
      }

      const group = await Group.findOne({ members: userId }).populate('members');
      if (!group) {
        res.status(404).json({ message: 'Grupo não encontrado.' });
        return;
      }

      res.status(200).json(group);
    } catch (error) {
      console.error('Erro ao buscar o grupo do usuário:', error);
      res.status(500).json({ message: 'Erro interno ao buscar o grupo do usuário.' });
    }
  };

}

export default UserController;
