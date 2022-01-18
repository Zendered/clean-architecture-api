import { Email, Name, IUserData } from './'
import { Either, left, right } from '../shared/'
import { InvalidEmailError, InvalidNameError } from './error'

export class User {
    public readonly name: Name
    public readonly email: Email

    private constructor (name: Name, email: Email) {
      this.name = name
      this.email = email
    }

    static create (userData: IUserData): Either<InvalidNameError | InvalidEmailError, User> {
      const nameOrError = Name.create(userData.name)
      if (nameOrError.isLeft()) {
        return left(nameOrError.value)
      }

      const emailORError = Email.create(userData.email)
      if (emailORError.isLeft()) {
        return left(emailORError.value)
      }

      const name: Name = nameOrError.value as Name
      const email: Email = emailORError.value as Email

      return right(new User(name, email))
    }
}
