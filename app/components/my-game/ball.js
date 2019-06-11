import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  randCol:service('balls-control'),
  socketService: service('game-server'),
  value:'',
  X:null,
  Y:null,
  id: 0,

  didInsertElement() {
    this.get('socketService').socketRef.on('kick ball', (position) => {
      // console.log(position);
      this.setProperties(position);
      this.settings();
    });
    // this.get('socketService').socketRef.on('user id', (id) => {
    // });
    // console.log(this.id);


  },

  settings(){
    this.$('span').css({
      'background': '#' + this.get('randCol').colorCode,
      'transform': 'translate(' + this.X +'px,' + this.Y +'px)',
    })
  },

  actions:{
    kickBall(){
      // this.set('X', Math.floor(Math.random()*951));
      // this.set('Y', Math.floor(Math.random()*351));
      this.settings();
      this.set('id', this.get('socketService.userNo'));

      this.get('socketService').clickBall()

      // const socket = this.socketService.socketFor('localhost:3000/');
      // socket.send({username: 'foo', didSomeAction: 'pressedAButton'}, true);

      // the above line is the same as this:
      // socket.send(JSON.stringify({username: 'foo', didSomeAction: 'pressedAButton'}));
    },

    // setNewValuesWithKeyPress(){
    //   this.send('setNewValues');
    // },

    // setNewValues(){
    //  this.settings();
    // }
  }
});
