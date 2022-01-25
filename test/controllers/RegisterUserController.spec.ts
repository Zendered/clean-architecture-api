import { MissingParamError } from "@src/controllers/errors/MissingParamError";
import { IHttpRequest, IHttpResponse } from "@src/controllers/ports/";
import { RegisterUserController } from "@src/controllers/RegisterUserController";
import { IUserData } from "@src/entities";
import { InvalidEmailError, InvalidNameError } from "@src/entities/error";
import { RegisterUserOnMailingList } from "@src/useCases/register-user-on-mailing-list";
import { IUserRepository, IUseCase } from "@src/useCases/register-user-on-mailing-list/ports";
// import { InMemoryUserRepository } from '@src/useCases/register-user-on-mailing-list/repository'
import { InMemoryUserRepository } from '@test/useCases/register-user-on-mailing-list/repository'


describe('Register user web controller', () => {
    const user: IUserData[] = []
    const repo: IUserRepository = new InMemoryUserRepository(user)
    const usecase: IUseCase = new RegisterUserOnMailingList(repo)
    const controller: RegisterUserController = new RegisterUserController(usecase)

    class ErrorThrowingUseCaseStub implements IUseCase {
        perform(request: any): Promise<void> {
            throw Error()
        }
    }

    const errorThrowingUseCaseStub: IUseCase = new ErrorThrowingUseCaseStub()

  test("Should return status code 201 when request contains valid user data", async () => {
    const request: IHttpRequest = {
        body: {
            name: "any_name",
            email: 'any@mail.com',
        }
    }
    const response: IHttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })

  test("Should return status code 400 when request contains invalid name", async () => {
    const requestWithInvalidName: IHttpRequest = {
        body: {
            name: "A",
            email: 'any@mail.com',
        }
    }
    const response: IHttpResponse = await controller.handle(requestWithInvalidName)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  test("Should return status code 400 when request contains invalid email", async () => {
    const requestWithInvalidEmail: IHttpRequest = {
        body: {
            name: "any name",
            email: 'invalid_email.com',
        }
    }
    const response: IHttpResponse = await controller.handle(requestWithInvalidEmail)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  test("Should return status code 400 when request is missing user name", async () => {
    const requestWithMissingName: IHttpRequest = {
        body: {email: 'any@mail.com',}
    }
    const response: IHttpResponse = await controller.handle(requestWithMissingName)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name.')
  })

  test("Should return status code 400 when request is missing user email", async () => {
    const requestWithMissingEmail: IHttpRequest = {
        body: {name: 'any name',}
    }
    const response: IHttpResponse = await controller.handle(requestWithMissingEmail)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: email.')
  })

  test("Should return status code 400 when request is missing user email", async () => {
    const requestWithMissingNameAndEmail: IHttpRequest = {
        body: {}
    }
    const response: IHttpResponse = await controller.handle(requestWithMissingNameAndEmail)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name email.')
  })

  test("Should return status code 500 when server raises", async () => {
    const request: IHttpRequest = {
        body: {
            name: "Any name",
            email: 'any@mail.com',
        }
    }
    const controller: RegisterUserController = new RegisterUserController(errorThrowingUseCaseStub)
    const response: IHttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(500)
    expect(response.body).toBeInstanceOf(Error)
  })

});
