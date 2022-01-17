import { InvalidEmailError } from '../../entities/error/InvalidEmailError'
import { InvalidNameError } from '../../entities/error/InvalidNameError'
import { User } from '../../entities/User'
import { IUserData } from '../../entities/userData'
import { Either, left, right } from '../../shared/Either'
import { IUserRepository } from './ports/userRepository'

export class RegisterUserOnMailingList {
    private readonly userRepo: IUserRepository

    constructor (userRepo: IUserRepository) {
      this.userRepo = userRepo
    }

    public async registerUserOnMailingList (request: IUserData): Promise<Either<InvalidNameError | InvalidEmailError, IUserData>> {
      const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(request)
      if (userOrError.isLeft()) {
        return left(userOrError.value)
      }

      if (!(await this.userRepo.exists(request))) {
        await this.userRepo.add(request)
      }

      return right(request)
    }
}
