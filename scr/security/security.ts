import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {UserService} from "../services/user.service";
import { UserDto } from "../dto/user.dto";
import { InternalException, NotFoundException } from "../exceptions";

export class SecurityClass {
  static async encryptUserPassword(password: string): Promise<string | undefined> {
    return bcrypt.hash(password, 10);
  }

  static async authenticateUser(email: string, password: string): Promise<string> {
    try {
      const userService = new UserService();
      const user = await userService.getUserByEmail(email);

      if (!user) {
        throw new NotFoundException(`Não encontrado usuário com o seguinte email: ${email}`);
      }

      const userData = new UserDto(
        user.name,
        user.email,
        user.createdAt ? user.createdAt : new Date()
      );
      const isCorrectPassword = await this.verifyPassword(password, user.password);

      if (isCorrectPassword) {
        return jwt.sign(userData.toJson(), "SECRET", { expiresIn: "24h" });
      } else {
        throw new InternalException(`Senha incorreta para o usuário: ${email}`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalException(`Erro ao consultar a tabela de usuários`);
    }
  }

  static async verifyPassword(password: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }
}
