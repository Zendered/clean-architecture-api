import { IUserData } from '../../../entities/userData'

export interface IUserRepository {
    add(user: IUserData): Promise<void>
    findUserByEmail(email: string): Promise<IUserData>
    findAllUsers(): Promise<IUserData[]>
    exists(user: IUserData): Promise<boolean>
}