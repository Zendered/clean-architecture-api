import request from 'supertest'
import {app} from '@src/main/config/'

describe('Content type middleware', () => {
    test('Should return default content as json', async () => {
        app.get('/test_content_type',(req,res) => {
            res.send('')
        })
        await request(app)
            .get('/test_content_type')
            .expect('Content-Type',/json/)
    })

    test('should return xml content when forced', async () => {
        app.get('/test_content_type_xml',(req,res) => {
            res.type('xml')
            res.send('')
        })
        await request(app)
            .get('/test_content_type_xml')
            .expect('Content-Type',/xml/)
    })
    
})