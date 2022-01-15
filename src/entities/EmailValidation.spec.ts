import { Email } from "./Email"

describe("Email validation", () => {
    test("should not accept null string", () => {
         const email = null
         expect(Email.validate(email)).toBeFalsy()
    })

    test("should not accept empty string", () => {
        const email:string = ""
        expect(Email.validate(email)).toBeFalsy()
   })

   test("should accept valid e", () => {
    const email:string = "any@email.com"
    expect(Email.validate(email)).toBeTruthy()
})
})