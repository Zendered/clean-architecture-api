import { IUserData } from "../../entities/userData"
import { IUserRepository } from "./ports/userRepository";
import { InMemoryUserRepository } from "./repository/InMemoryUserRepository";
import {RegisterUserOnMailingList} from './RegisterUserOnMailingList'

describe("Register user on mailing list", () => {
    test("should add user with complete data to mailing list", async () => {
        const users: IUserData[] = []
        const repo: IUserRepository = new InMemoryUserRepository(users)
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const name = "any_name"
        const email = "any@email.com"
        const response = await usecase.registerUserOnMailingList({ name, email })
        const user = repo.findUserByEmail("any@email.com")
        expect((await user).name).toBe("any_name")
        expect(response.value.name).toBe("any_name")
    })
})