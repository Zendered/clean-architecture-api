import { IHttpResponse } from '@src/controllers/ports'

export const created = (data:any):IHttpResponse => ({
  statusCode: 201,
  body: data
})
