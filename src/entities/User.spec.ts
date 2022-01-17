import { left } from "../shared/Either"
import { InvalidEmailError } from "./error/InvalidEmailError"
import { InvalidNameError } from "./error/InvalidNameError"
import { User } from "./User"

describe("User domain entity",() => {
    test("should not create user with e-mail address",() => {
        const invalidEmail = "invalid-email"
        const error = User.create({name: "any_name", email: invalidEmail})
        expect(error).toEqual(left(new InvalidEmailError()))
    })

    test("should not create user with invalid name (too few characters)",() => {
        const invalidName = "O          "
        const error = User.create({name: invalidName, email: "any_name@mail.com"})
        expect(error).toEqual(left(new InvalidNameError()))
    })

    test("should not create user with invalid name (too many characters)",() => {
        const invalidName = "O".repeat(257)
        const error = User.create({name: invalidName, email: "any_name@mail.com"})
        expect(error).toEqual(left(new InvalidNameError()))
    })
})