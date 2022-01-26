import { PrismaClient } from '@prisma/client'
import { IUserData } from '@src/entities'
import { IUserRepository } from '@src/useCases/register-user-on-mailing-list/ports'
export class PrismaUserRepository implements IUserRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor (private readonly prisma:PrismaClient) {}

  async add (user: IUserData): Promise<void> {
    await this.prisma.user.findFirst({
      where: user
    })

    await this.exists(user)

    await this.prisma.user.create({
      data: user
    })
  }

  async findUserByEmail (email: string): Promise<IUserData> {
    const userCollection = await this.prisma.user.findFirst({
      where: { email }
    })
    return userCollection
  }

  async findAllUsers (): Promise<IUserData[]> {
    throw new Error('Method not implemented.')
  }

  async exists (user: IUserData): Promise<boolean> {
    const result = await this.findUserByEmail(user.email)
    if (result != null) {
      return true
    }
    return false
  }
}
