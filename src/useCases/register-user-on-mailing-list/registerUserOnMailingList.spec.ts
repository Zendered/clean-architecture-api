import { IUserData } from "../../entities/userData"

describe("Register user on mailing list", () => {
    test("should add user with complete data to mailing list", async () => {
        const users: IUserData[] = []
        console.log(users);

        // const repo: UserRepository = new InMemoryUserRepository(users)
        // const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        // const name = "any_name"
        // const email = "any@email.com"
        // const response = await usecase.registerUserOnMailingList({ name, email })
        // const user = repo.findUserByEmail("any@email.com")
        // expect((await user).name).toBe(name)
    })
})