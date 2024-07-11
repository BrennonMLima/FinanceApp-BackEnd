import User, { IUser } from '../models/user.model';
import Group from '../models/group.model'
import { SecurityClass } from '../security/security';
import { UserDto } from '../dto/user.dto';
import { InternalException, NotFoundException } from '../exceptions';

export class UserService {
  public async createUser(userData: any): Promise<UserDto> {
    try {
      const { name, email, password } = userData;

      const hashedPassword = await SecurityClass.encryptUserPassword(password);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      return new UserDto(
        savedUser.name,
        savedUser.email,
        savedUser.createdAt ? savedUser.createdAt : new Date()
      );
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalException(`Erro ao criar usuário`);
    }
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
