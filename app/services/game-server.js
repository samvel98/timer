import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  websockets: service('socket-io'),
  socketRef: null,
  connected: false,
  connectMessage:'disconected',
  onlines:0,
  userNo:[],
  player1: 0,
  player2: 0,
  connect() {
    const socket = this.websockets.socketFor('ws://192.168.0.113:3000/');

    this.set('connectMessage','connected');
    this.set('connected', true);

    socket.on('connect', this.myOpenHandler, this);
    socket.on('close', this.myCloseHandler, this);
    socket.on('update_users_count', this.usersCount, this)
    socket.on('update_users', this.updateUsers, this)

    this.set('socketRef', socket);
  },

  disconnect() {
    this._super(...arguments);
    const socket = this.socketRef;
    socket.off('connect', this.myOpenHandler);
    socket.off('message', this.myMessageHandler);
    socket.off('close', this.myCloseHandler);
  },

  updateUsers(users){
    this.set('player1', users[0].total);
    this.set('player2', users[1].total);
    console.log(this.player1);
  },

  usersCount(count){
    this.set('onlines', count);
  },

  myOpenHandler(event) {
    this.set('connected', true);
 },

  myCloseHandler(event) {
    console.log(`On close event has been called: ${event}`);
  },

  clickBall() {
    this.socketRef.emit('click_ball');
  },

  actions: {
    sendButtonPressed() {
      this.socketRef.send('Hello Websocket World');
    }
  }
});
