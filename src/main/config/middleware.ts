import { Express } from 'express'
import { bodyParser } from '@src/main/config/middleware/body-parser'
import { cors } from '@src/main/config/middleware/cors'
import { contentType } from './middleware/content-type'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
