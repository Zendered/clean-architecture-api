import { IUserData } from "@src/entities/"
import { IUserRepository } from "@src/useCases/register-user-on-mailing-list/ports/";
import { InMemoryUserRepository } from '@src/useCases/register-user-on-mailing-list/repository'
// import { InMemoryUserRepository } from '@test/useCases/register-user-on-mailing-list/repository'
import {RegisterUserOnMailingList} from '@src/useCases/register-user-on-mailing-list/RegisterUserOnMailingList'

describe("Register user on mailing list", () => {
    test("should add user with complete data to mailing list", async () => {
        const users: IUserData[] = []
        const repo: IUserRepository = new InMemoryUserRepository(users)
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const name = "any_name"
        const email = "any@email.com"
        const response = await usecase.perform({ name, email })
        const user = repo.findUserByEmail("any@email.com")
        expect((await user).name).toBe("any_name")
        expect(response.value.name).toBe("any_name")
    })

    
    test("should not add user with invalid email to mailing list", async () => {
        const users: IUserData[] = []
        const repo: IUserRepository = new InMemoryUserRepository(users)
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const name = "any_name"
        const inValidEmail = "invalid_email"
        const response = (await usecase.perform({ name, email: inValidEmail})).value as Error
        const user = await repo.findUserByEmail(inValidEmail)
        expect(user).toBeNull()
        expect(response.name).toEqual("InvalidEmailError")
    })

    test("should not add user with invalid name to mailing list", async () => {
        const users: IUserData[] = []
        const repo: IUserRepository = new InMemoryUserRepository(users)
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const inValidName = ""
        const email = "invalid_email"
        const response = (await usecase.perform({ name: inValidName, email})).value as Error
        const user = await repo.findUserByEmail("any@email.com")
        expect(user).toBeNull()
        expect(response.name).toEqual("InvalidNameError")
    })
})