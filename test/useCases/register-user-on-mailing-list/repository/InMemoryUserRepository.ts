import { IUserRepository } from '@src/useCases/register-user-on-mailing-list/ports/'
import { IUserData } from '@src/entities/'

export class InMemoryUserRepository implements IUserRepository {
  private repository: IUserData[]

  constructor (repository: IUserData[]) {
    this.repository = repository
  }

  async add (user: IUserData): Promise<void> {
    const exists = await this.exists(user)
    if (!exists) {
      this.repository.push(user)
    }
  }

  async findUserByEmail (email: string): Promise<IUserData> {
    const found = this.repository.find(user => user.email === email)
    return found || null
  }

  async findAllUsers (): Promise<IUserData[]> {
    return this.repository
  }

  async exists (user: IUserData): Promise<boolean> {
    if (await this.findUserByEmail(user.email) === null) {
      return false
    }
    return true
  }
}
