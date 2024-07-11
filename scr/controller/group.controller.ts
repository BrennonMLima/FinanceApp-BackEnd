import { Request, Response } from 'express';
import GroupService from '../services/group.service';

class GroupController {
  private groupService: GroupService;

  constructor() {
    this.groupService = new GroupService();
  }

  public createGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description,members } = req.body;

      const newGroup = await this.groupService.createGroup(name, description,members);

      res.status(201).json({ message: 'Grupo criado com sucesso.', group: newGroup });
    } catch (error) {
      console.error('Erro ao criar grupo:', error);
      res.status(500).json({ message: 'Erro interno ao criar grupo.' });
    }
  };

  public getAllGroups = async (req: Request, res: Response): Promise<void> => {
    try {
      const groups = await this.groupService.getAllGroups();
      res.status(200).json(groups);
    } catch (error) {
      console.error('Erro ao buscar todos os grupos:', error);
      res.status(500).json({ message: 'Erro interno ao buscar grupos.' });
    }
  };

  public getGroupById = async (req: Request, res: Response): Promise<void> => {
    try {
      const groupId = req.params.id;
      const group = await this.groupService.getGroupById(groupId);

      if (!group) {
        res.status(404).json({ message: 'Grupo não encontrado.' });
        return;
      }

      res.status(200).json(group);
    } catch (error) {
      console.error('Erro ao buscar grupo por ID:', error);
      res.status(500).json({ message: 'Erro interno ao buscar grupo por ID.' });
    }
  };
}

export default GroupController;
