import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';
import { set } from '@ember/object';

export default Component.extend({

  currentOperand: '',
  secondOperand: '',

  operator: '',


  didInsertElement() {
    $(window).on('keyup', (event) => {
      const value = event.originalEvent.key;

      const btnObj = this.get('calcButtons').findBy('value', value);
      if (btnObj) {
        set(btnObj, 'buttonClass', 'active');
        setTimeout(() => {
          set(btnObj, 'buttonClass', '');
        }, 50);
      }



      if (this.isOperator(value)) {
          let currentOperand = this.get('currentOperand') || 0;
          let secondOperand = this.get('secondOperand') || 0;

          if (value === '*' || value === '/') {
            currentOperand = this.get('currentOperand') || 1;
            secondOperand = this.get('secondOperand') || 1;
          }

          if (value === '=' || value === 'Enter') {
            const oldOperator = this.get('operator');
            this.set('operator', '');

            const result = eval(`${currentOperand}${oldOperator}${secondOperand}`);
            this.set('currentOperand', result.toString());
            this.set('secondOperand', '');
            return;
          }

          const oldOperator = this.get('operator') || value;
          this.set('operator', value);

          const result = eval(`${currentOperand}${oldOperator}${secondOperand}`);

          this.set('currentOperand', result.toString());
          this.set('secondOperand', '');
          return;
      } else if (this.isNumber(value)) {
        let secondOperand = this.get('secondOperand');

        if (this.isAllowedNumber(value)) {
          secondOperand += value;
          this.set('secondOperand', secondOperand);
        }
      } else if (value === 'Backspace') {
        this.set('secondOperand', '');
        this.set('currentOperand', '');
        this.set('operator', '');
      }
    });
  },

  inputVal: computed('currentOperand', 'secondOperand', function() {
    const secondOperand = this.get('secondOperand');
    const currentOperand = this.get('currentOperand');


    if (secondOperand.length) {
      return secondOperand;
    }

    if (currentOperand.length) {
      return currentOperand;
    }

    return 0;
  }),

  calcButtons: computed(function() {
    return [
      {
        value: '7',
        isOperator: false
      },
      {
        value: '8',
        isOperator: false
      },
      {
        value: '9',
        isOperator: false
      },
      {
        value: '/',
        isOperator: true
      },
      {
        value: '4',
        isOperator: false
      },
      {
        value: '5',
        isOperator: false
      },
      {
        value: '6',
        isOperator: false,
        highlight: false,
      },
      {
        value: '*',
        isOperator: true
      },
      {
        value: '1',
        isOperator: false
      },
      {
        value: '2',
        isOperator: false
      },
      {
        value: '3',
        isOperator: false
      },
      {
        value: '-',
        isOperator: true
      },
      {
        value: '0',
        isOperator: false
      },
      {
        value: '.',
        isOperator: false
      },
      {
        value: '=',
        isOperator: true
      },
      {
        value: 'Enter',
        isOperator: true
      },
      {
        value: '+',
        isOperator: true
      },
    ];
  }),

  operators: computed('calcButtons', function() {
    return this.get('calcButtons').filterBy('isOperator', true);
  }),

  numbers: computed('calcButtons', function() {
    return this.get('calcButtons').filterBy('isOperator', false)
  }),

  isOperator(value) {
    return this.get('operators').getEach('value').includes(value);
  },

  isNumber(value) {
    return this.get('numbers').getEach('value').includes(value);
  },

  isAllowedNumber(value) {
    const secondOperand = this.get('secondOperand');

    if (value === '.' && secondOperand.includes('.')) {
      return false;
    } else if (value === '.' && !secondOperand.length) {
      return false;
    }

    return true;
  }

});
