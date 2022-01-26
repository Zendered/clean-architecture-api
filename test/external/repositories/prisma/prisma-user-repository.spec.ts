import { PrismaClient } from '@prisma/client'
import { PrismaUserRepository } from '@src/external/repositories/prisma/prisma-user-repository'

describe('Prisma user repository', () => {
    let prisma: PrismaClient

    beforeAll(() => {
        prisma = new PrismaClient()
    })

    beforeEach(async () => {
        await prisma.user.deleteMany({})
        // await prisma.email.deleteMany({})
    })

  test('When user is added, it should exist', async () => {
    const userRepository = new PrismaUserRepository(prisma)
    const user = {
        name: 'any name',
        email: 'any@mail.com'
    }
    await userRepository.add(user)
    expect(await userRepository.exists(user)).toBeTruthy()
  })
})
