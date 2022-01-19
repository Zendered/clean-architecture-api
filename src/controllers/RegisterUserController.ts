import { IUserData } from '@src/entities'
import { RegisterUserOnMailingList } from '@src/useCases/register-user-on-mailing-list'
import { IHttpRequest, IHttpResponse } from './ports'
import { badRequest, created } from './util'

export class RegisterUserController {
    private readonly usecase: RegisterUserOnMailingList

    constructor (usecase: RegisterUserOnMailingList) {
      this.usecase = usecase
    }

    public async handle (request:IHttpRequest):Promise<IHttpResponse> {
      const userData:IUserData = request.body
      const response = await this.usecase.registerUserOnMailingList(userData)

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      if (response.isRight()) {
        return created(response.value)
      }
    }
}
