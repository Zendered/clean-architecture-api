import { Express } from 'express'
import { bodyParser, contentType, cors } from '@src/main/config/middleware/'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
