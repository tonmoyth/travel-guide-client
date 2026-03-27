export interface IUser {
  id: string
  name: string
  email: string
  role: string
  emailVerified: boolean
  needPasswordChange: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ILoginResponse {
  success: boolean
  message?: string
  data: {
    accessToken: string
    refreshToken: string
    token: string
    user: IUser
  }
}

export interface IRegisterResponse {
  success: boolean
  message?: string
  data: {
    user: IUser
    accessToken: string
    refreshToken: string
    token: string
  }
}

export interface IError {
  success: false
  message: string
}
