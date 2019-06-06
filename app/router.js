import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('contact');
  this.route('rentals', function() {
    this.route('show', { path: '/:rental_id' });
  });
  this.route('timer');
  this.route('calculator');
  this.route('new-calculator');
  this.route('todos', function() {
    this.route('active');
    this.route('completed');
  });
});

export default Router;
