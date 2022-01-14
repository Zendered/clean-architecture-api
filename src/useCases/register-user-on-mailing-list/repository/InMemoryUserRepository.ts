import { IUserRepository } from "../../ports/userRepository";
import { IUserData } from "../userData";

export class InMemoryUserRepository implements IUserRepository {

    private repository: IUserData[]

    constructor(repository: IUserData[]) {
        this.repository = repository
    }

    add(user: IUserData): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findUserByEmail(email: string): Promise<IUserData> {
        return null
    }

    findAllUsers(): Promise<IUserData[]> {
        throw new Error("Method not implemented.");
    }

    exists(user: IUserData): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}