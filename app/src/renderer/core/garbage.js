module.exports = function(game) {
  const APP = require('../../../app')('../../../')
  const {
    GARBAGE
  } = require(APP.path.core('data'))
  
  return class Garbage {
    create(stage, pi){
      this.stage = stage
      this.pi    = pi
      this.queue = []
      // 0 1 2 3 4 5
      this.alternate = [
        {index: 0, frame: [0,1,2,3,4,5]}, // 1 garbage wide
        {index: 0, frame: [0,4,2]},       // 2 garbage wide
        {index: 0, frame: [0,3,1,2]},     // 3 garbage wide
        {index: 0, frame: [0,2]},         // 4 garbage wide
        {index: 0, frame: [0,1]},         // 5 garbage wide
        {index: 0, frame: [0]}            // 6 garbage wide
      ]

    }

    alt(size) {
      const x   = this.alternate[size-1].frame[this.alternate[size-1].index]
      const len = this.alternate[size-1].frame.length
      this.alternate[size-1].index++
      if (this.alternate[size-1].index >= len){
        this.alternate[size-1].index = 0
      }
      return x
    }
 
    update(combo,chain) {
      let ncombo = false
      let nchain = false
      if (combo > 3) { ncombo = combo }
      if (chain > 0) { nchain = chain }
      if (ncombo !== false || nchain !== false) {
        this.push(ncombo,nchain)
      }

      if (this.queue.length > 0) {
        this.queue[0].counter--
        if (this.queue[0].counter === 0){
          this.shift()
        }
      }
    }

    push(combo,chain) {
      const delay = 20
      this.queue.push({
        counter: delay,
        combo  : combo,
        chain  : chain
      })
    }

    shift() {
      let playfield = null
      if (this.pi === 0) { playfield = this.stage.playfield2 }
      else               { playfield = this.stage.playfield1 }
      if (
        playfield.stack(0).empty &&
        playfield.stack(1).empty &&
        playfield.stack(2).empty &&
        playfield.stack(3).empty &&
        playfield.stack(4).empty &&
        playfield.stack(5).empty
      ) {
        this.left  = !this.left
        const v = this.queue.shift()
        if (v.combo === 4) {
          const o = this.alt(3) //offset
          playfield.stack(o+0).set_garbage(this.stage.tick)
          playfield.stack(o+1).set_garbage(this.stage.tick)
          playfield.stack(o+2).set_garbage(this.stage.tick)
        } else if (v.combo === 5){
          const o = this.alt(4) //offset
          playfield.stack(o+0).set_garbage(this.stage.tick)
          playfield.stack(o+1).set_garbage(this.stage.tick)
          playfield.stack(o+2).set_garbage(this.stage.tick)
          playfield.stack(o+3).set_garbage(this.stage.tick)
        } else if (v.combo === 6){
          const o = this.alt(5) //offset
          playfield.stack(o+0).set_garbage(this.stage.tick)
          playfield.stack(o+1).set_garbage(this.stage.tick)
          playfield.stack(o+2).set_garbage(this.stage.tick)
          playfield.stack(o+3).set_garbage(this.stage.tick)
          playfield.stack(o+4).set_garbage(this.stage.tick)
        } else if (v.combo === 7){
          const o = this.alt(6) //offset
          playfield.stack(o+0).set_garbage(this.stage.tick)
          playfield.stack(o+1).set_garbage(this.stage.tick)
          playfield.stack(o+2).set_garbage(this.stage.tick)
          playfield.stack(o+3).set_garbage(this.stage.tick)
          playfield.stack(o+4).set_garbage(this.stage.tick)
          playfield.stack(o+5).set_garbage(this.stage.tick)
        } else if (v.combo === 8){
          playfield.stack(o+0).set_garbage(this.stage.tick)
          playfield.stack(o+1).set_garbage(this.stage.tick)
          playfield.stack(o+2).set_garbage(this.stage.tick)
          playfield.stack(o+3).set_garbage(this.stage.tick)
          playfield.stack(o+4).set_garbage(this.stage.tick)
          playfield.stack(o+5).set_garbage(this.stage.tick)

          playfield.stack(o+0).set_garbage(this.stage.tick)
          playfield.stack(o+1).set_garbage(this.stage.tick)
          playfield.stack(o+2).set_garbage(this.stage.tick)
          playfield.stack(o+3).set_garbage(this.stage.tick)
          playfield.stack(o+4).set_garbage(this.stage.tick)
          playfield.stack(o+5).set_garbage(this.stage.tick)
        } else if (v.combo === 9){
        } else if (v.combo === 10){
        } else if (v.combo === 11){
        } else if (v.combo === 12){
        } else if (v.combo === 13){
        }
      }
    }
  }
}
