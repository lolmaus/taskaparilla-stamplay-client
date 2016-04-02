import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('auth');
  this.route('tasks', {path: '/'});
});

export default Router;
