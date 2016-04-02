import Ember from 'ember';
import {task} from 'ember-concurrency';

const {
  Component,
  computed,
  inject: {service}
} = Ember;

export default Component.extend({

  // ----- Services -----
  session: service(),
  store:   service(),



  // ----- Overridden properties -----
  classNames: ['signupForm'],



  // ----- Static propeties -----
  user: computed(function () {
    return this
      .get('store')
      .createRecord('user', this.get('newUserDefaults'));
  }),

  newUserDefaults: {
     email:    'lolmaus@gmail.com',
     password: 'asdfasdf'
  },



  // ----- Methods -----
  reset () {
    const newUserDefaults = this.get('newUserDefaults');

    this
      .get('user')
      .setProperties(newUserDefaults);
  },



  // ----- Tasks -----
  login: task(function * () {
    const authenticationData = {
      email:    this.get('user.email'),
      password: this.get('user.password')
    };

    yield this
      .get('session')
      .authenticate('authenticator:stamplay', authenticationData)
      .then(() => {
        this.reset();
      });
  }).drop()

});
