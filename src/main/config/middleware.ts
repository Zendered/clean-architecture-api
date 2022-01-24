import { Express } from 'express'
import { bodyParser } from '@src/main/config/middleware/body-parser'

export default (app: Express): void => {
  app.use(bodyParser)
}
