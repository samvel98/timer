import Component from '@ember/component';
import { computed, set, } from '@ember/object';
import { run } from '@ember/runloop';
import $ from 'jquery';

export default Component.extend({
  inputValue: '',
  addedColumn: '',
  titles: computed(function(){
    return [];
  }),
  titles_tmp:null,
  bool:0,
  completed:0,

  init() {
    this._super(...arguments);
    this.getList();
  },

  getList() {
    $.get('http://127.0.0.1:8000/api/todo').then((res) => {
      run(() => {
        this.set('titles', res);
      });
    });
  },

  actions: {
    create() {
      let data = {
        title: this.inputValue,
        completed: 0,
      }
      $.post('http://127.0.0.1:8000/api/todo', data);
      this.set('inputValue',null);
      this.getList();
    },

    inputTitle(e){
      const value = e.originalEvent.key;
      if(value == "Enter"){
        this.send('create');
      }
    },

    deletSelecteds(){
      for (var i = 0; i < this.titles.length; i++) {
        if(this.titles[i].completed){
          $.ajax({
            url: 'http://127.0.0.1:8000/api/todo/' + this.titles[i].id,
            type: 'DELETE',
            dataType: "JSON",
          }).then((res) => {
            run(() => {
              this.set('titles', res);
            })
          })
        }
      }
    },

    delete(list){
    $.ajax({
        url: 'http://127.0.0.1:8000/api/todo/' + list.id,
        type: 'DELETE',
        dataType: "JSON",
      }).then((res) => {
        run(() => {
              this.set('titles', res);
        })
      })
    },

    completItem(list){
      this.set('bool', list.completed);
      if(this.bool){
        this.set('bool', 0);
      }else {
        this.set('bool', 1);
      }
      // this.toggleProperty('bool');
      $.ajax({
        url: 'http://127.0.0.1:8000/api/todo/' + list.id,
        method:'POST',
        dataType: "JSON",
        data:{
            completed: this.bool,
        }
      }).then(() => {
        run(() => {
          set(list, 'completed', this.bool);
        })
      })
    },

    selectAll(){
      if(this.completed){
        this.set('completed', 0)
      }else {
        this.set('completed',1)
      }
      $.get('http://127.0.0.1:8000/api/todo', {
        completed: this.completed
      }).then((res) => {
        run(() => {
          this.set('titles',res);
        })
      })
    },

    getAll(){
      this.getList();
    },

    filterByActive(){
      $.get('http://127.0.0.1:8000/api/todo').then((res) => {
        run(() => {
          this.set('titles', res.filterBy('completed',0));
        })
      })
    },

    filterByCompleted(){
      $.get('http://127.0.0.1:8000/api/todo').then((res) => {
        run(() => {
          this.set('titles', res.filterBy('completed',1));
        })
      })
    }
  }
});
