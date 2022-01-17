import { IUserData } from './userData'
import { Either, left } from '../shared/Either'
import { InvalidEmailError } from './error/InvalidEmailError'
import { Email } from './Email'

export class User {
  static create (userData: IUserData): Either<InvalidEmailError, User> {
    const emailORError = Email.create(userData.email)

    if (emailORError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
