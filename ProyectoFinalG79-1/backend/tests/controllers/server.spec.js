import request from 'supertest'
import app from '../../server.js'
import { generateToken } from '../utils/login.js'
import { faker } from '@faker-js/faker'

describe("Operaciones CRUD de backend", () => {
    let token, fakeToken
    beforeAll(() => {
        token = generateToken()
        fakeToken = faker.string.alphanumeric()
    })

    describe('Without token', () => {
        it('should return status 200', async () => {
            const res = await request(app)
                .get('/api/productos')
            expect(res.statusCode).toBe(200)
        })
    })

    describe('With valid token', () => {
        it('should return categoria as an array', async () => {
            const res = await request(app)
                .get('/api/categoria')
                .set('Authorization', `Bearer ${token}`)
            expect(res.body.data).toBeInstanceOf(Array)
        })
    })

    describe('With invalid or missing token', () => {
        it('should return 400 for invalid token', async () => {
            const res = await request(app)
                .get('/api/categoria')
                .set('Authorization', `Bearer ${fakeToken}`)
            expect(res.statusCode).toBe(400)
        })
        it('should return 404 if token es empty', async () => {
            const res = await request(app)
                .get('/api/regiones')
                .set('Authorization', 'Bearer ')
            expect(res.statusCode).toBe(404)
        })
    })
});
