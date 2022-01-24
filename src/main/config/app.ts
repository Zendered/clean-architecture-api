import express from 'express'
import setupMiddleware from '@src/main/config/middleware'

export const app = express()

setupMiddleware(app)
