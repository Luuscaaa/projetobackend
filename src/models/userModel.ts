// Definição da estrutura de dados da interface User

export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
}