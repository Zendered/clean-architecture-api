import { IUserData } from './userData'
import { Either, left } from '../shared/Either'
import { InvalidEmailError } from './error/InvalidEmailError'
import { InvalidNameError } from './error/InvalidNameError'
import { Email } from './Email'
import { Name } from './Name'

export class User {
  static create (userData: IUserData): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name)
    if (nameOrError.isLeft()) {
      return left(new InvalidNameError())
    }

    const emailORError = Email.create(userData.email)
    if (emailORError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
