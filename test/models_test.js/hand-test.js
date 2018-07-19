const chai = require('chai')

const bookshelf = require('../../app/db/bookshelf')
const Hand = require('../../app/models/hand')

const expect = chai.expect

const mockHand = {
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
} 

describe('Hand', function() {
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
    return User.forge().
      // we can use a transaction by setting
      // a `transacting` param in the options
      // we pass to `save()`
      save(mockHand, { transacting: transaction }).
      then(hand => {
        expect(hand.get('id')).to.be.a('number') 
        expect(hand.get('position')).to.be.a('string')
        expect(hand.get('position')).to.equal(mockHand.position) 
        expect(hand.get('preFlopRaise')).to.be.a('string')
        expect(hand.get('preFlopRaise')).to.equal(mockHand.preFlopRaise)
        expect(hand.get('flopBet')).to.be.a('string')
        expect(hand.get('flopBet')).to.equal(mockHand.flopBet) 
        expect(hand.get('turnBet')).to.be.a('string')
        expect(hand.get('turnBet')).to.equal(mockHand.turnBet) 
        expect(hand.get('riverBet')).to.be.a('string')
        expect(hand.get('riverBet')).to.equal(mockHand.riverBet) 
        expect(hand.get('playersToFlop')).to.be.a('number')
        expect(hand.get('playersToFlop')).to.equal(mockHand.playersToFlop) 
        expect(hand.get('playersToTurn')).to.be.a('number')
        expect(hand.get('playersToTurn')).to.equal(mockHand.playersToTurn)
        expect(hand.get('playersToRiver')).to.be.a('number')
        expect(hand.get('playersToRiver')).to.be.equal(mockHand.playersToRiver) 
        expect(hand.get('playersToShowdown')).to.be.a('number')
        expect(hand.get('playersToShowdown')).to.equal(mockHand.playersToShowdown) 
        expect(hand.get('status')).to.be.a('boolean')
        expect(hand.get('status')).to.equal(mockHand.status) 
        expect(hand.get('potSize')).to.be.a('float')
        expect(hand.get('potSize')).to.equal(mockHand.potSize) 
        expect(hand.get('holeCards')).to.be.a('string')
        expect(hand.get('holeCards')).to.equal(mockHand.holeCards)
        expect(hand.get('flop')).to.be.a('string')
        expect(hand.get('flop')).to.equal(mockHand.flop)
        expect(hand.get('turn')).to.be.a('string')
        expect(hand.get('turn')).to.equal(mockHand.turn)
        expect(hand.get('river')).to.be.a('string')
        expect(hand.get('river')).to.equal(mockHand.river) 
        expect(hand.get('session_id')).to.be.a('number')
        expect(hand.get('session_id')).to.equal(mockHand.session_id) 
      })
  })
})