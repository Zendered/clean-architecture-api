import { Express } from 'express'
import { bodyParser } from '@src/main/config/middleware/body-parser'
import { cors } from '@src/main/config/middleware/cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}
