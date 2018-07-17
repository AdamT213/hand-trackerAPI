const chai = require('chai')
 
/* ADD ME! */
const app = require('../app')

const supertest = require('supertest')
 
const expect = chai.expect

let server
 
before(function() {
  return app.up().then(_server => {
    server = _server
  })
})
 
after(function() {
  server.close()
})
 
describe('app', function() {
  describe('up', function() {
    it('is a function', function() {
      expect(app.up).to.be.an.instanceof(Function)
    })
  })
  
  describe('/api/hands', function() {
    describe('POST', function() {
      it('fails with an empty request body', function(done) {
        supertest(server).
          post('/api/hands').
          expect(400, done)
      })
 
      /** This is new! */
      it('succeeds with valid hand values', function(done) {
        supertest(server).
          post('/api/hands').
          send({
            position: 'Under The Gun',
            preFlopRaise: '3bb by sb',
            flopBet: 'check',
            turnBet: 'half pot by sb',
            riverBet: 'check',
            playersToFlop: 3,
            playersToTurn: 3,
            playersToRiver: 2,
            playersToShowdown: 2,
            status: 1,
            potSize: 2.5,
            holeCards: 'Jd Js',
            flop: 'Jc Qh Kd',
            turn: 'Ac',
            river: 'Qd',
            session_id: 1034,
            table_id: 1502,
          }).
          set('content-type', 'application/json').
          expect(200, done)
      })
    })
  })
})