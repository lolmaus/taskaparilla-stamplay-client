import Ember            from 'ember';
import {task,taskGroup} from 'ember-concurrency';

const {
  Component,
  computed,
  inject: {service}
} = Ember;

export default Component.extend({

  // ----- Services -----
  ajaxStamplay: service(),
  session:      service(),
  store:        service(),



  // ----- Overridden properties -----
  classNames: ['authForm'],



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
  authTaskGroup: taskGroup().drop(),

  loginTask: task(function * () {
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
  }).group('authTaskGroup'),


  signupTask: task(function * () {
    const createUserData = {
      email:    this.get('user.email'),
      password: this.get('user.password')
    };

    yield this
      .get('ajaxStamplay')
      .createUserAndAuthenticate(createUserData)
      .then(() => {
        this.reset();
      });
  }).group('authTaskGroup'),

});
