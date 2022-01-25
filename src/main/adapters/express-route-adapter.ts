import { RegisterUserController } from '@src/controllers/'
import { Request, Response } from 'express'
import { IHttpRequest, IHttpResponse } from '@src/controllers/ports'

export const adaptRoute = (controller: RegisterUserController) => {
  return async (req: Request, res:Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body
    }

    const httpResponse: IHttpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
