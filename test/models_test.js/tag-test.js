const chai = require('chai')

const bookshelf = require('../../app/db/bookshelf')
const Tag = require('../../app/models/tag')

const expect = chai.expect 

const mockTag = { 
  name: 'Beat with a pair of jacks'
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
    return Tag.forge().
      // we can use a transaction by setting
      // a `transacting` param in the options
      // we pass to `save()`
      save(mockTag, { transacting: transaction }).
      then(tag => {
        expect(tag.get('id')).to.be.a('number') 
        expect(tag.get('name')).to.be.a('string')
        expect(tag.get('name')).to.equal(mockTag.name)   
      })
  })
})