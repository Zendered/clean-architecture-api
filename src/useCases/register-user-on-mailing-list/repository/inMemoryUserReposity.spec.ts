import { IUserData } from "../userData"
import { InMemoryUserRepository } from "./InMemoryUserRepository"

describe("In memory User repository", () => {
    test("should return null if user is not found", async () => {
        const users: IUserData[] = []
        const userRepo = new InMemoryUserRepository(users)
        const user = await userRepo.findUserByEmail("any@email.com")
        expect(user).toBeNull()
    })
})