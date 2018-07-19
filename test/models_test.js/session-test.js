const chai = require('chai')

const bookshelf = require('../../app/db/bookshelf')
const Session = require('../../app/models/session')

const expect = chai.expect 

const mockSession = { 
  duration: 45,
  status: false,
  amount: 7.5,
} 

describe('Session', function() {
  let transaction;
 
  beforeEach(done => {
    bookshelf.transaction(t => {
      transaction = t
      done()
    })
  })
 
  afterEach(function() {
    return transaction.rollback()
  })
 
  it('saves a record to the database', function() {
    return Session.forge().
      // we can use a transaction by setting
      // a `transacting` param in the options
      // we pass to `save()`
      save(mockSession, { transacting: transaction }).
      then(session => {
        expect(session.get('id')).to.be.a('number') 
        expect(session.get('duration')).to.be.a('number')
        expect(session.get('duration')).to.equal(mockSession.duration) 
        expect(session.get('status')).to.be.a('boolean')
        expect(session.get('status')).to.equal(mockSession.status)
        expect(session.get('amount')).to.be.a('number')
        expect(session.get('amount')).to.equal(mockSession.amount)  
      })
  })
})