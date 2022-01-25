import { Router } from 'express'
import { makeRegisterUserController } from '@src/main/factories/'
import { adaptRoute } from '@src/main/adapters'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeRegisterUserController()))
}
