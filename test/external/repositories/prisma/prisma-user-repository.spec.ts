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

  test('Find all users should return all added users', async () => {
    const userRepository = new PrismaUserRepository(prisma)
    await userRepository.add({
        name: 'any_name',
        email: 'any@mail.com'
    })
    await userRepository.add({
        name: 'second_name',
        email: 'second@mail.com'
    })
    const users = await userRepository.findAllUsers()    
    expect(users[0].name).toEqual('any_name')
    expect(users[1].name).toEqual('second_name')
  })
})
