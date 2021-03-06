const APP = require('../../../../app')('../../../../')
const chai  = require('chai')
const sinon = require('sinon')

const Game = require(APP.path.spec('helpers','game_spec'))
const game = new Game()
const CoreSnapshots = require(APP.path.core('snapshots'))(game)
const Playfield  = require(APP.path.components('playfield'))(game)

chai.should()

describe('Snapshots', function() {
  describe('#cindex()', function(){
    it('should work', function(){
      const snapshots = new CoreSnapshots()
      snapshots.create(null,null) //suppose to pass playfields but don't care right now

      snapshots.index_tick = 0
      snapshots.cindex(0).should.eql(0)

      snapshots.index_tick = 120
      snapshots.cindex(124).should.eql(4)

      snapshots.index_tick = 120
      snapshots.cindex(114).should.eql(114)
    }) // it
  }) // describe
  describe('#load()', function(){
    it('should work', function(){
      const p0 = new Playfield(0)
      const p1 = new Playfield(1)
      const snapshots = new CoreSnapshots()
      snapshots.create(p0,p1) //suppose to pass playfields but don't care right now
      console.log('ss',snapshots.snapshot[0][1])
    }) // it
  }) // describe
})
