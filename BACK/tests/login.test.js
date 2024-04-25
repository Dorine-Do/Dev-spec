const request = require('supertest');
const app = require('../routes/login/route');

describe('POST /login', () => {
    it('should return 200 OK', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: "test@gmail.fr",
                password: "test"
            })
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('User found')
    })
})