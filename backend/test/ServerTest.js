/* eslint-disable no-undef */
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('Test Initiated', () => {
    it('Should Return Pong Message', (done) => {
        chai.request('localhost:5000')
            .get('/ping')
            .end((_err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('message').eql('Pong')
            })
        done()
    })
})
