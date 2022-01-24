import { IUserData } from '@src/entities'
import { IUseCase } from '@src/useCases/register-user-on-mailing-list/ports'
import { MissingParamError } from './errors/MissingParamError'
import { IHttpRequest, IHttpResponse } from './ports'
import { badRequest, created, serverError } from './util'

export class RegisterUserController {
    private readonly usecase: IUseCase

    constructor (usecase: IUseCase) {
      this.usecase = usecase
    }

    public async handle (request:IHttpRequest):Promise<IHttpResponse> {
      try {
        if (!(request.body.name) || !(request.body.email)) {
          let missingParam = !(request.body.name) ? 'name ' : ''
          missingParam += !(request.body.email) ? 'email' : ''
          return badRequest(new MissingParamError(missingParam.trim()))
        }

        const userData:IUserData = request.body
        const response = await this.usecase.perform(userData)

        if (response.isLeft()) {
          return badRequest(response.value)
        }

        if (response.isRight()) {
          return created(response.value)
        }
      } catch (err) {
        return serverError(err)
      }
    }
}
