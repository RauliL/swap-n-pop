const APP = require('swap-n-pop_app')
const fs   = require('fs')
const chai = require('chai')
const sinon = require('sinon')
chai.should()

const game = require(APP.path.spec('helpers','game_spec'))

const seedrandom = require('seedrandom')
const Stage      = require(APP.path.states('mode_vs'))(game)
const Playfield  = require(APP.path.components('playfield'))(game)
const Stack      = require(APP.path.core('stack'))(game)

describe('Playfield', function() {
  describe('#class_name' ,function(){
    it('should be type of Playfield', function(){
      const playfield = new Playfield(0)
      playfield.should.be.a('Playfield')
    })
  })

  describe('#constructor()' ,function(){
    it('should work with player_id 0', function(){
      const playfield = new Playfield(0)
    })
    it('should work with player_id 1', function(){
      const playfield = new Playfield(1)
    })
    it('should error out if invalid player_id', function(){
      (function(){
        const playfield = new Playfield()
      }).should.throw("player_number present and must be 0 or 1")
    })
  })

  describe('#create()' ,function(){
    it('should work', function(){
      const stage = new Stage()
      stage.init({seed: 'test'})
      const stack     = new Stack(stage.rng)
      const playfield = new Playfield(0)
      playfield.create_stack = sinon.stub()
      playfield.create(stage,{push: true, x: 0, y: 0, panels: stack.panels})
    })
  })

  describe('#create_panels()' ,function(){
    let stage     = null
    let stack     = null
    let playfield = null
    beforeEach(function(){
      stage = new Stage()
      stage.init({seed: 'test'})
      stack = new Stack(stage.rng)
      playfield = new Playfield(0)
    })
    it('should create stack of 72 with push', function(){
      playfield.create(stage,{push: true, x: 0, y: 0, panels: stack.panels})
      playfield.stack.length.should.eql(72)
    })
    it('should create stack of 66 without push', function(){
      playfield.create(stage,{x: 0, y: 0, panels: stack.panels})
      playfield.stack.length.should.eql(66)
    })
    it('should create stack full of panels', function(){
      playfield.create(stage,{x: 0, y: 0, panels: stack.panels})
      for(let panel of playfield.stack){
        panel.should.all.be.a('Panel')
      }
    })
  })

  describe('#fill_panels()' ,function(){
    let stage     = null
    let stack     = null
    let playfield = null
    beforeEach(function(){
      stage = new Stage()
      stage.init({seed: 'test'})
      stack = new Stack(stage.rng)
      playfield = new Playfield(0)
    })
    it('should create stack of 72 with push', function(){
      playfield.create(stage,{push: true, x: 0, y: 0, panels: stack.panels})
      playfield.stack.length.should.eql(72)
    })
  })
}) //klass
