import { IUserData } from "../../entities/userData"
import { IUserRepository } from "./ports/userRepository";
import { InMemoryUserRepository } from "./repository/InMemoryUserRepository";
import {RegisterUserOnMailingList} from './RegisterUserOnMailingList'
import { InvalidEmailError } from "../../entities/error/InvalidEmailError";
import { left } from "../../shared/Either";

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

    
    test("should add user with invalid email to mailing list", async () => {
        const users: IUserData[] = []
        const repo: IUserRepository = new InMemoryUserRepository(users)
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const name = "any_name"
        const inValidEmail = "invalid_email"
        const response = await usecase.registerUserOnMailingList({ name, email: inValidEmail})
        const user = await repo.findUserByEmail("any@email.com")
        expect((user)).toBeNull()
        expect(response).toEqual(left(new InvalidEmailError()))
    })
})