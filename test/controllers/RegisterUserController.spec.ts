import { IHttpRequest, IHttpResponse } from "@src/controllers/ports/";
import { RegisterUserController } from "@src/controllers/RegisterUserController";
import { IUserData } from "@src/entities";
import { RegisterUserOnMailingList } from "@src/useCases/register-user-on-mailing-list";
import { IUserRepository } from "@src/useCases/register-user-on-mailing-list/ports";
import { InMemoryUserRepository } from "@test/useCases/register-user-on-mailing-list/repository";

describe('Register user web controller', () => {
  test("Should return status code 201 when request contains valid user data", async () => {
    const request: IHttpRequest = {
        body: {
            name: "any_name",
            email: 'any@mail.com',
        }
    }
    const user: IUserData[] = []
    const repo: IUserRepository = new InMemoryUserRepository(user)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const controller: RegisterUserController = new RegisterUserController(usecase)
    const response: IHttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })
});
