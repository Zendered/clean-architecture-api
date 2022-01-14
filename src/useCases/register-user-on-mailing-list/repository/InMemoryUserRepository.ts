import { IUserRepository } from "../../ports/userRepository";
import { IUserData } from "../userData";

export class InMemoryUserRepository implements IUserRepository {

    private repository: IUserData[]

    constructor(repository: IUserData[]) {
        this.repository = repository
    }

    async add(user: IUserData): Promise<void> {
        const exists = await this.exists(user)
        if (!exists) {
            this.repository.push(user)
        }
    }

    async findUserByEmail(email: string): Promise<IUserData> {
        const user = this.repository.filter((user) => {
            return user.email === email
        })
        if (user.length > 0) {
            return user[0]
        }
        return null
    }

    async findAllUsers(): Promise<IUserData[]> {
        return this.repository
    }

    async exists(user: IUserData): Promise<boolean> {
        if (await this.findUserByEmail(user.email) === null) {
            return false
        }
        return true
    }
}