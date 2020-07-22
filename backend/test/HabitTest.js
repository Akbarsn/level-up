/* eslint-disable no-undef */
require('dotenv').config()

const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const PORT = process.env.PORT

chai.use(chaiHttp)

describe('Get All Habits', () => {
    it('Get All Habits OK', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        chai.request(`localhost:${PORT}`)
            .get('/habit')
            .set('authorization', `bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('habits')

                expect(res.body.habits).to.be.an('array')

                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })

    it('Get All Habits 401', (done) => {
        chai.request(`localhost:${PORT}`)
            .get('/habit')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('habits')

                expect(res.body.habits).to.be.an('array')

                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })
})

describe('Create a Habit', () => {
    it('Create a Habit OK', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        const habit = {
            title: 'Exercise every morning',
            description: 'Just Do It',
            type: 1
        }

        chai.request(`localhost:${PORT}`)
            .post('/habit')
            .send(habit)
            .set('authorization', `bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('title')
                expect(res.body).to.have.property('description')
                expect(res.body).to.have.property('type')

                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })

    it('Create a Habit 401', (done) => {
        const habit = {
            title: 'Exercise every morning',
            description: 'Just Do It',
            type: 1
        }

        chai.request(`localhost:${PORT}`)
            .post('/habit')
            .send(habit)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('title')
                expect(res.body).to.have.property('description')
                expect(res.body).to.have.property('type')

                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })

    it('Create a Habit 400', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        const habit = {
            description: 'Just Do It',
            type: 1
        }

        chai.request(`localhost:${PORT}`)
            .post('/habit')
            .send(habit)
            .set('authorization', `bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('title')
                expect(res.body).to.have.property('description')
                expect(res.body).to.have.property('type')

                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })
})

describe('Update Habit', () => {
    it('Update Habit OK', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        const habit = {
            title: 'Be productive',
            description: 'It changed',
            type: 1
        }

        chai.request(`localhost:${PORT}`)
            .put('/habit/1')
            .send(habit)
            .set('authorization', `bearer ${token}`)
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

    it('Update Habit 400', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        const habit = {
            description: 'It changed',
            type: 1
        }

        chai.request(`localhost:${PORT}`)
            .put('/habit/1')
            .send(habit)
            .set('authorization', `bearer ${token}`)
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

    it('Update Habit 401', (done) => {
        const habit = {
            title: 'Be productive',
            description: 'It changed',
            type: 1
        }

        chai.request(`localhost:${PORT}`)
            .put('/habit/1')
            .send(habit)
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

    it('Update Habit 406', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        const habit = {
            title: 'Be productive',
            description: 'It changed',
            type: 1
        }

        chai.request(`localhost:${PORT}`)
            .put('/habit/2')
            .send(habit)
            .set('authorization', `bearer ${token}`)
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

describe('Delete Habit', () => {
    it('Delete Habit OK', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        chai.request(`localhost:${PORT}`)
            .delete('/habit/1')
            .send(habit)
            .set('authorization', `bearer ${token}`)
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

    it('Delete Habit 401', (done) => {
        chai.request(`localhost:${PORT}`)
            .delete('/habit/1')
            .send(habit)
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

    it('Delete Habit 406', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        chai.request(`localhost:${PORT}`)
            .delete('/habit/2')
            .send(habit)
            .set('authorization', `bearer ${token}`)
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
})
