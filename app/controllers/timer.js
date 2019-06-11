import Controller from '@ember/controller';


export default Controller.extend({
  ms: 0,
  s: 0,
  m: 0,
  h: 0,
  start: 'start',
  interval: null,
  class:'continue',

  actions: {
    start() {
      if(this.start == 'start' || this.start == 'continue') {
        this.set('start','pause');
        this.set('class','pause');
        this.interval = setInterval(() => {
          this.set('ms', this.ms + 1);
          if(this.ms>99){
            this.set('ms',0);
            this.set('s', this.s + 1);
          }
          if(this.s > 59){
            this.set('s', 0);
            this.set('m', this.m + 1);
          }
          if(this.m > 59){
            this.set('m', 0);
            this.set('h', this.h + 1);
          }
        },10)
      }
      else {
        clearInterval(this.interval);
        this.set('start','continue');
        this.set('class','continue');
      }
    }
  },

});

