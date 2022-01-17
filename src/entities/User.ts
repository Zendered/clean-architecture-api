import { IUserData } from './userData'
import { Either, left, right } from '../shared/Either'
import { InvalidEmailError } from './error/InvalidEmailError'
import { InvalidNameError } from './error/InvalidNameError'
import { Email } from './Email'
import { Name } from './Name'

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
        return left(new InvalidNameError(userData.name))
      }

      const emailORError = Email.create(userData.email)
      if (emailORError.isLeft()) {
        return left(new InvalidEmailError(userData.email))
      }

      const name: Name = nameOrError.value as Name
      const email: Email = emailORError.value as Email

      return right(new User(name, email))
    }
}
