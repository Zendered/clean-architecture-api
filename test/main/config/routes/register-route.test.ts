import request from 'supertest'
import {app} from '@src/main/config'

describe('Register routes', () => {
    test('Should return an account on success', async () => {
        app.post('/test_cors', (req,res) => {
            res.send()
        })

        await request(app)
            .post('/api/register')
            .send({
                name: 'any name',
                email: 'any@mail.com'
            })
            .expect(201)
    })
})