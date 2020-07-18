/* eslint-disable no-undef */
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const model = require('../models')

chai.use(chaiHttp)

describe('Register test', () => {
    before(() => {
        model.User.destroy({
            truncate: true
        })
    })

    it('Should return 200 and user schema', (done) => {
        const user = {
            full_name: 'Akbar Satya Nugraha',
            email: 'personal.akbarsn@gmail.com',
            username: 'akbarsn',
            password: '123456'
        }

        chai.request('localhost:5000')
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

    it('Should error with status 400', (done) => {
        const user = {
            full_name: 'Akbar Satya Nugraha',
            username: 'akbarsn',
            password: '123456'
        }

        chai.request('localhost:5000')
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
    it('Should get JWT token with status code 200', (done) => {
        const user = {
            username: 'akbarsn',
            password: '123456'
        }

        chai.request('localhost:5000')
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

    it('Should give 406 error', (done) => {
        const user = {
            username: 'john',
            password: '1234567'
        }

        chai.request('localhost:5000')
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
