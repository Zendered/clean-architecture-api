import { InvalidEmailError, InvalidNameError } from '@src/entities/error/'
import { User, IUserData } from '@src/entities/'
import { Either, left, right } from '@src/shared/'
import { IUserRepository } from './ports/'

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
