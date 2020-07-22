/* eslint-disable no-undef */
require('dotenv').config()

const chai = require('chai')
const chaiHttp = require('chai-http')

const jwt = require('jsonwebtoken')
const moment = require('moment')
const JWT_KEY = process.env.JWT_KEY
const PORT = process.env.PORT

const expect = chai.expect
chai.use(chaiHttp)

describe('Get all task', () => {
    it('Get Task OK', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        chai.request(`localhost:${PORT}`)
            .get('/task')
            .set('authorization', `bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('tasks')

                expect(res.body.tasks).to.be.an('array')
                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })

    it('Get Task 401 Error', (done) => {
        chai.request(`localhost:${PORT}`)
            .get('/task')
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

describe('Create new task', () => {
    it('Create Task OK', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        const data = {
            title: 'Clean the kitchen',
            description: 'Task from mother',
            priority: 1,
            due_date: moment().add(7, 'days').format('YYYY-MM-DD hh:mm:ss')
        }

        chai.request(`localhost:${PORT}`)
            .post('/task')
            .send(data)
            .set('authorization', `bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('title')
                expect(res.body).to.have.property('description')
                expect(res.body).to.have.property('priority')
                expect(res.body).to.have.property('due_date')

                expect(res.body.title).to.be.an('string')
                expect(res.body.description).to.be.an('string')
                expect(res.body.priority).to.be.an('number')

                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })

    it('Create Task 400 Error', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        const data = {
            description: 'Task from mother',
            priority: 1,
            due_date: moment().add(7, 'days').format('YYYY-MM-DD hh:mm:ss')
        }

        chai.request(`localhost:${PORT}`)
            .post('/task')
            .send(data)
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

    it('Create Task 401', (done) => {
        const data = {
            title: 'Clean the kitchen',
            description: 'Task from mother',
            priority: 1,
            due_date: moment().add(7, 'days').format('YYYY-MM-DD hh:mm:ss')
        }

        chai.request(`localhost:${PORT}`)
            .post('/task')
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

describe('Update task', () => {
    it('Update task OK', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        const data = {
            title: 'Clean the kitchen',
            description: 'Task from mother',
            priority: 1,
            due_date: moment().add(7, 'days').format('YYYY-MM-DD hh:mm:ss')
        }

        chai.request(`localhost:${PORT}`)
            .put('/task/3')
            .send(data)
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

    it('Update task 400', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        const data = {
            description: 'Task from mother',
            priority: 1,
            due_date: moment().add(7, 'days').format('YYYY-MM-DD hh:mm:ss')
        }

        chai.request(`localhost:${PORT}`)
            .put('/task/3')
            .send(data)
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

    it('Update task 406', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        const data = {
            title: 'Clean the kitchen',
            description: 'Task from mother',
            priority: 1,
            due_date: moment().add(7, 'days').format('YYYY-MM-DD hh:mm:ss')
        }

        chai.request(`localhost:${PORT}`)
            .put('/task/2')
            .send(data)
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

describe('Delete task', () => {
    it('Task Deleted OK', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        chai.request(`localhost:${PORT}`)
            .delete('/task/1')
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

    it('Task Deleted 401', (done) => {
        chai.request(`localhost:${PORT}`)
            .delete('/task/1')
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

    it('Task Deleted 406', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        chai.request(`localhost:${PORT}`)
            .delete('/task/2')
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
