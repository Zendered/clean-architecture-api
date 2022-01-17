import { left } from "../shared/Either"
import { InvalidEmailError } from "./error/InvalidEmailError"
import { User } from "./User"

describe("User domain entity",() => {
    test("should not create user with e-mail address",() => {
        const invalidEmail = "invalid-email"
        const error = User.create({name: "any_name", email: invalidEmail})
        expect(error).toEqual(left(new InvalidEmailError()))
    })
})