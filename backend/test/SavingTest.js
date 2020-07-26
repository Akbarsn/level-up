/* eslint-disable no-undef */
require('dotenv').config()

const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const PORT = process.env.PORT

chai.use(chaiHttp)

describe('Get saving', () => {
    it('Get saving OK', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        chai.request(`localhost:${PORT}`)
            .get('/saving')
            .set('Authorization', `bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('saving')
                expect(res.body).to.have.property('histories')

                expect(res.body.saving).to.be.an('object')
                expect(res.body.saving).to.have.property('id')
                expect(res.body.saving).to.have.property('total_amount')
                expect(res.body.saving).to.have.property('monthly_amount')
                expect(res.body.histories).to.be.an('array')

                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })

    it('Get saving 401', (done) => {
        chai.request(`localhost:${PORT}`)
            .get('/saving')
            .end((err, res) => {
                expect(res).to.have.status(401)
                expect(res.body).to.have.property('message')

                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })
})

describe('Add saving', () => {
    it('Add saving OK', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        const data = {
            total_amount: 1000000
        }

        chai.request(`localhost:${PORT}`)
            .post('/saving')
            .send(data)
            .set('Authorization', `bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200)

                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('total_amount')
                expect(res.body).to.have.property('monthly_amount')

                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })

    it('Add saving 400', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        chai.request(`localhost:${PORT}`)
            .post('/saving')
            .set('Authorization', `bearer ${token}`)
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

    it('Add saving 401', (done) => {
        const data = {
            total_amount: 1000000
        }

        chai.request(`localhost:${PORT}`)
            .post('/saving')
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(401)
                expect(res.body).to.have.property('message')

                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })
})

// describe('Update saving', () => {
//     it('Update saving OK', (done) => {

//     })

//     it('Update saving 400', (done) => {

//     })

//     it('Update saving 401', (done) => {

//     })

//     it('Update saving 406', (done) => {

//     })
// })
