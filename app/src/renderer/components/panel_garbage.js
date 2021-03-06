module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const _f = require(APP.path.core('filters'))
  const {
    COLS,
    UNIT,
    FALL,
    CLEAR,
    STATIC,
    TIME_GARBAGE_CLEAR,
    TIME_GARBAGE_POP,
    GARBAGE,
    GARBAGE_SHAKE
  } = require(APP.path.core('data'))
  class PanelGarbage {
    get [Symbol.toStringTag](){ return 'PanelGarbage' }

    get state()    {return this._state }
    set state(val) {       this._state = val }

    get group()    {return this._group }
    set group(val) {       this._group = val }

    create(panel,playfield){
      this.panel     = panel
      this.playfield = playfield
      this.sprite = game.add.sprite(0,0, 'garbage',0)
      this.sprite.visible = false
    }

    /**
     Returns the index of the current panel clearing and amount of panels clearing
     @returns {array} - [index,length]
     */
    get clear_index(){
      if (this.state !== CLEAR) {
        throw(new Error('clear_index called on none CLEAR panel'))
      }
      let panels = []
      for (let p of this.playfield.stack()){
        if (p.state               === GARBAGE &&
            p.panel_garbage.group === this.group) {
          panels.push(p.panel_garbage)
        }
      }
      return [panels.indexOf(this),panels.length]
    }

    popping(){
      if (this.panel.state === GARBAGE &&
          this.playfield.clearing_garbage.indexOf(this.group) !== -1 ){
        this.state         = CLEAR
        this.panel.counter = TIME_GARBAGE_CLEAR + (this.group_len * TIME_GARBAGE_POP)
        this.panel.set('unique')
      }
    }

    get group_len(){
      let len = 0
      for (let p of this.playfield.stack()){
        if (p.state               === GARBAGE &&
            p.panel_garbage.group === this.group) {
          len++
        }
      }
      return len
    }

    update(){
      switch (this.state) {
        case STATIC:
          if (this.fall_check()) {
            this.state = FALL
          } else if  (
            this.panel.under.state === CLEAR ||
            this.panel.above.state === CLEAR ||
            this.panel.left.state  === CLEAR ||
            this.panel.right.state === CLEAR
          ){
            const i = this.playfield.clearing_garbage.indexOf(this.group)
            if (i === -1){
              this.playfield.clearing_garbage.push(this.group)
            }
          }
        break;
        case FALL:
          if (this.fall_check()) {
            this.panel.under.state               = GARBAGE
            this.panel.under.panel_garbage.group = this.group
            this.panel.under.panel_garbage.state = this.state

            this.group = null
            this.state = null

            this.panel.kind    = null
            this.panel.state   = STATIC
            this.panel.counter = 0
            this.panel.chain   = 0
          } else {
            this.playfield.shake   = 0
            this.playfield.counter = GARBAGE_SHAKE[this.playfield.shake].length
            this.state = STATIC
          }
        break;
        case CLEAR:
          if (this.panel.counter > 0) { 
            this.panel.counter--
            const [i,len] = this.clear_index
            this.time_max = TIME_GARBAGE_CLEAR + (len   * TIME_GARBAGE_POP)
            this.time_pop = TIME_GARBAGE_CLEAR + (len-i * TIME_GARBAGE_POP)
            this.time_cur = this.time_max - this.panel.counter
          } else {
            this.state = STATIC
            this.group = null
            this.panel.state = STATIC
          }
        break;
      }
    }

    /** 
     * This looks at the current row for panels that belong
     * to this garbage panel group and then check below each one to
     * see if all of them are empty underneath so it should fall.
     *
     * */
    fall_check(){
      let fall = true
      for (let x = 0; x < COLS; x++){
        let panel = this.playfield.stack(x,this.panel.y)
        if (panel.state               === GARBAGE &&
            panel.panel_garbage.group === this.group) {
          if (panel.under.empty === false || panel.under.hang) { fall = false}
        }
      }
      return fall
    }

    render_visible(){
      if (this.state === CLEAR){
        this.sprite.visible = this.time_cur < this.time_pop
      } else {
        this.sprite.visible = this.panel.state === GARBAGE
      }
    }

    /** */
    render(){
      let str = ''
      if (this.state === CLEAR){
        this.sprite.frame = 13
      } else {
        if (this.panel.left.state  === GARBAGE && this.panel.left.panel_garbage.group  === this.group){ str += '1' } else { str += '0' }
        if (this.panel.right.state === GARBAGE && this.panel.right.panel_garbage.group === this.group){ str += '1' } else { str += '0' }
        if (this.panel.above.state === GARBAGE && this.panel.above.panel_garbage.group === this.group){ str += '1' } else { str += '0' }
        if (this.panel.under.state === GARBAGE && this.panel.under.panel_garbage.group === this.group){ str += '1' } else { str += '0' }

        if      (str === '0000'){ this.sprite.frame = 0}

        else if (str === '0100'){ this.sprite.frame = 1}
        else if (str === '1100'){ this.sprite.frame = 2}
        else if (str === '1000'){ this.sprite.frame = 3}

        else if (str === '0101'){ this.sprite.frame = 4}
        else if (str === '1101'){ this.sprite.frame = 5}
        else if (str === '1001'){ this.sprite.frame = 6}

        else if (str === '0111'){ this.sprite.frame = 7}
        else if (str === '1111'){ this.sprite.frame = 8}
        else if (str === '1011'){ this.sprite.frame = 9}

        else if (str === '0110'){ this.sprite.frame = 10}
        else if (str === '1110'){ this.sprite.frame = 11}
        else if (str === '1010'){ this.sprite.frame = 12}
      }

      let x = this.playfield.layer_block.x
      let y = this.playfield.layer_block.y
      x    += (this.panel.x * UNIT)
      y    += (this.panel.y * UNIT)
      this.sprite.x = x
      this.sprite.y = y

      this.render_visible()
    }
    /** */
    shutdown(){}
  } // klass
  return PanelGarbage
}
