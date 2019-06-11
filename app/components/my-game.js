import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { reads } from '@ember/object/computed';

export default Component.extend({
  socketService: service('game-server'),
  start: reads('socketService.connected'),
  buttonText: "start",
  // id: 0,
  didInsertElement() {


    // console.log(this.get('socketService').connect());
    // this.set('uers', this.get('socketService').onlines);
    // console.log(this.get('socketService').onlines);

    // this.set('users', this.get('socketService.onlines'));
  },

  actions:{
    startGame(){
      this.get('socketService').connect();
      this.set('buttonText', 'connecting...');
      this.set('id', this.get('socketService.userNo'));
      // console.log(this.get('socketService.userNo'));
      // this.get('socketService').getUserId();
    }
  }
});
