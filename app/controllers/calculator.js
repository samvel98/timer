import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  zang: computed(function() {
  return [7,8,9,'/',4,5,6,'*',1,2,3,'-',0,'.','=','+'];
  }),
  sum: 0,
  actions : {
    calc(item) {
      console.log(item)
    }


  }
});
