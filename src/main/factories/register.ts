import { PrismaClient } from '@prisma/client'
import { RegisterUserController } from '@src/controllers'
import { PrismaUserRepository } from '@src/external/repositories/prisma/prisma-user-repository'
import { RegisterUserOnMailingList } from '@src/useCases/register-user-on-mailing-list'

export const makeRegisterUserController = (): RegisterUserController => {
  let prisma: PrismaClient
  const prismaUserRepository = new PrismaUserRepository(prisma)
  const registerUserOnMailingListUseCase = new RegisterUserOnMailingList(prismaUserRepository)
  const registerUserController = new RegisterUserController(registerUserOnMailingListUseCase)
  return registerUserController
}
