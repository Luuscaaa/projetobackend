import { UserRepository } from '../repositories/userRepository';
import { isValidEmail, isValidName, isValidpasswordHash } from '../helpers/validationHelper';
import bcrypt from 'bcrypt'; 

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(name: string, email: string, password: string) {
    if (!isValidName(name)) {
      throw new Error('Nome inválido');
    }
    if (!isValidEmail(email)) {
      throw new Error('Email inválido');
    }
    if (!isValidpasswordHash(password)) { 
      throw new Error('Senha inválida');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    return await this.userRepository.addUser(name, email, passwordHash); 
  }

  async loginUser(email: string, password: string) {
    if (!isValidEmail(email)) {
      throw new Error('Email inválido');
    }
    if (!password) {
      throw new Error('Senha não pode ser vazia');
    }

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }

    return user; 
  }

  async listUsers() {
    return await this.userRepository.getAllUsers();
  }
}