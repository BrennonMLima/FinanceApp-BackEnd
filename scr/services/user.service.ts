import User, { IUser } from '../models/user.model';
import Group from '../models/group.model'

class UserService {
  public async createUser(name: string, email: string, password: string): Promise<IUser> {
    const newUser = new User({ name, email, password });
    return await newUser.save();
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).exec();
  }

  public async getUserGroup(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    
    const group = await Group.findOne({ members: userId }).populate('members');
    if (!group) {
      throw new Error('Grupo não encontrado para o usuário.');
    }

    return group;
  }

}

export default UserService;
