/* eslint-disable no-undef */
require('dotenv').config()

const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const PORT = process.env.PORT

chai.use(chaiHttp)

describe('Test Initiated', () => {
    it('Ping', (done) => {
        chai.request(`localhost:${PORT}`)
            .get('/ping')
            .end((_err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('message').eql('Pong')
            })
        done()
    })
})
