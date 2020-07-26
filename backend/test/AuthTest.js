/* eslint-disable no-undef */
require('dotenv').config()

const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const PORT = process.env.PORT

chai.use(chaiHttp)

describe('Register test', () => {
    it('Register OK', (done) => {
        const user = {
            full_name: 'Akbar Satya Nugraha',
            email: 'personal.akbarsn@gmail.com',
            username: 'akbarsn',
            password: '123456'
        }

        chai.request(`localhost:${PORT}`)
            .post('/register')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('full_name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('username')
                expect(res.body).to.have.property('password')
                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })

    it('Register 400', (done) => {
        const user = {
            full_name: 'Akbar Satya Nugraha',
            username: 'akbarsn',
            password: '123456'
        }

        chai.request(`localhost:${PORT}`)
            .post('/register')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('message')
                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })
})

describe('Login test', () => {
    it('Login OK', (done) => {
        const user = {
            username: 'akbarsn',
            password: '123456'
        }

        chai.request(`localhost:${PORT}`)
            .post('/login')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('message')
                expect(res.body.data).to.have.property('token')
                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })

    it('Login 406', (done) => {
        const user = {
            username: 'john',
            password: '1234567'
        }

        chai.request(`localhost:${PORT}`)
            .post('/login')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(406)
                expect(res.body).to.have.property('message')

                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })
})
