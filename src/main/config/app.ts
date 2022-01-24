import express from 'express'
import setupMiddleware from '@src/main/config/middleware'
import setupRoutes from '@src/main/config/routes'

export const app = express()

setupMiddleware(app)
setupRoutes(app)
