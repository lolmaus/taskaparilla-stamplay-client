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
  errorText: null,

  user: computed(function () {
    return this
      .get('store')
      .createRecord('user', this.get('newUserDefaults'));
  }),

  newUserDefaults: {
     email:    'lolmaus@gmail.com',
     password: 'asdfasdf'
  },
  
  
  
  // ----- Computed properties -----
  effectiveErrorText: computed('errorText', function () {
    const errorText = this.get('errorText');
    
    if (errorText && errorText.trim() === 'Illegal arguments: string, undefined') {
      return "You don't have a password set. Login via social service, then set your password";
    }
    
    return errorText;
  }),



  // ----- Methods -----
  reset () {
    const newUserDefaults = this.get('newUserDefaults');

    this
      .get('user')
      .setProperties(newUserDefaults);

    this.set('errorText', null);
  },

  parseError (data) {
    const errorText =
      data
      && data.response
      && data.response.errors
      && data.response.errors[0]
      && data.response.errors[0].detail.error.message;

    if (!errorText) {
      throw data;
    }

    this.setProperties({errorText});
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
      })
      .catch(data => this.parseError(data));
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
      })
      .catch(data => this.parseError(data));
  }).group('authTaskGroup'),


  // ----- Actions -----
  actions: {
    socialAuth (service) {
      this
        .get('ajaxStamplay')
        .socialAuth(service);
    }
  }

});
