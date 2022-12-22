
export interface UserLoginInfo{
  mail: string;
  password: string;
}

export interface Role{
  id: number
  name: string
}

export interface UserLoginResponse {
  jwt: string
  roles: Role[]
}

export interface User{
  id: number
  lastName: string
  mail: string
  name: string
  roles: Role[]
}

export interface NewUser{
  id: number
  lastName: string
  mail: string,
  password: string
  name: string
  roles: Role[]
}

export interface Machine {
  id: number,
  name: string,
  creationDate: Date,
  status: Status,
  active: boolean,
  user: User
}

export enum Status {
  STOPPED,
  RUNNING
}

export interface ErrorMessage {
  date: Date,
  machineId: number,
  operation: string,
  message: string
}



