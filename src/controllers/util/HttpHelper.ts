import { IHttpResponse } from '@src/controllers/ports'

export const created = (data:any):IHttpResponse => ({
  statusCode: 201,
  body: data
})

export const badRequest = (data:any):IHttpResponse => ({
  statusCode: 400,
  body: data
})

export const serverError = (data:any):IHttpResponse => ({
  statusCode: 500,
  body: data
})
