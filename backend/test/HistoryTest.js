/* eslint-disable no-undef */
require('dotenv').config()

const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const PORT = process.env.PORT

chai.use(chaiHttp)

describe('Create transaction', () => {
    it('Create Transaction OK', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        const data = {
            type: 1,
            description: 'For eating',
            amount: 25000,
            savingId: 1
        }

        chai.request(`localhost:${PORT}`)
            .post('/history')
            .send(data)
            .set('Authorization', `bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('type')
                expect(res.body).to.have.property('description')
                expect(res.body).to.have.property('amount')

                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })

    it('Create Transaction 400', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        const data = {
            description: 'For eating',
            savingId: 1
        }

        chai.request(`localhost:${PORT}`)
            .post('/history')
            .send(data)
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

    it('Create Transaction 401', (done) => {
        const data = {
            type: 1,
            description: 'For eating',
            amount: 25000,
            savingId: 1
        }

        chai.request(`localhost:${PORT}`)
            .post('/history')
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

describe('Update transaction', () => {
    it('Update transaction OK', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        const data = {
            type: 1,
            description: 'For eating',
            amount: 25000
        }

        chai.request(`localhost:${PORT}`)
            .put('/history/1')
            .send(data)
            .set('Authorization', `bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('message')

                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })

    it('Update transaction 401', (done) => {
        const data = {
            type: 1,
            description: 'For eating',
            amount: 25000
        }

        chai.request(`localhost:${PORT}`)
            .put('/history/1')
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

    it('Update transaction 406', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        const data = {
            type: 1,
            description: 'For eating',
            amount: 25000
        }

        chai.request(`localhost:${PORT}`)
            .put('/history/3')
            .send(data)
            .set('Authorization', `bearer ${token}`)
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

describe('Delete transaction', () => {
    it('Delete Transaction OK', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        chai.request(`localhost:${PORT}`)
            .delete('/history/1')
            .set('Authorization', `bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('message')

                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })

    it('Delete Transaction 401', (done) => {
        chai.request(`localhost:${PORT}`)
            .delete('/history/1')
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

    it('Delete Transaction 406', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        chai.request(`localhost:${PORT}`)
            .delete('/history/3')
            .set('Authorization', `bearer ${token}`)
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
