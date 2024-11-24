export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface ChemicalDependents {
  name: string;
  cpf: string;
  age: number;
  userId: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
  role: Role;
  createdAt: Date;
}