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

    test("should not accept strings larger then 320 chars", () => {
        const email:string = "l".repeat(64) + "@" + "d".repeat(128) + "." + "d".repeat(127)
        expect(Email.validate(email)).toBeFalsy()
    })

    test("should not accept domain part larger then 255 chars", () => {
        const email:string = "local@" + "d".repeat(128) + "." + "d".repeat(127)
        expect(Email.validate(email)).toBeFalsy()
    })

    test("should not accept local part larger then 64 chars", () => {
        const email:string = "l".repeat(65) + "@email.com"
        expect(Email.validate(email)).toBeFalsy()
    })
})