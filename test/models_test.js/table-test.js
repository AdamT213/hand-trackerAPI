const chai = require('chai')

const bookshelf = require('../../app/db/bookshelf')
const Table = require('../../app/models/table')

const expect = chai.expect 

const mockTable = { 
  buyin: 50,
  size: 5,
  capacity: 6,
  session_id: 1
} 

describe('Table', function() {
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
    return Table.forge().
      // we can use a transaction by setting
      // a `transacting` param in the options
      // we pass to `save()`
      save(mockTable, { transacting: transaction }).
      then(table => {
        expect(table.get('id')).to.be.a('number') 
        expect(table.get('buyin')).to.be.a('number')
        expect(table.get('buyin')).to.equal(mockTable.buyin) 
        expect(table.get('size')).to.be.a('number')
        expect(table.get('size')).to.equal(mockTable.size)
        expect(table.get('capacity')).to.be.a('number')
        expect(table.get('capacity')).to.equal(mockTable.capacity)  
        expect(table.get('session_id')).to.be.a('number')
        expect(table.get('session_id')).to.equal(mockTable.session_id) 
      })
  })
})