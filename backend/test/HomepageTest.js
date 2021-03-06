/* eslint-disable no-undef */
require('dotenv').config()

const chai = require('chai')
const chaiHttp = require('chai-http')

const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const PORT = process.env.PORT

const expect = chai.expect
chai.use(chaiHttp)

describe('Get Homepage Data', () => {
    it('Homepage OK', (done) => {
        const payload = {
            id: 1,
            name: 'Akbar S N'
        }

        const token = jwt.sign(payload, JWT_KEY)

        chai.request(`localhost:${PORT}`)
            .get('/homepage')
            .set('authorization', `bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('full_name')
                expect(res.body).to.have.property('tasks')
                expect(res.body).to.have.property('habits')
                expect(res.body).to.have.property('saving')

                expect(res.body.tasks).to.be.an('array')
                expect(res.body.habits).to.be.an('array')
                // expect(res.body.saving).to.be.an('object')

                if (err) {
                    done(err)
                } else {
                    done()
                }
            })
    })

    it('Homepage error 401', (done) => {
        chai.request(`localhost:${PORT}`)
            .get('/homepage')
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
