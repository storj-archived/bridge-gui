import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('password-reset');
  this.route('confirm');
  this.route('dashboard', function() {
    this.route('billing');

    this.route('buckets', function() {
      this.route('new');

      this.route('edit', {
        path: ':bucket_id'
      });
    });
  });
  this.route('api');
});

export default Router;
