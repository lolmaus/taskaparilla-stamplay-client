import Ember  from 'ember';
import {task} from 'ember-concurrency';

const {
  Component,
  computed,
  inject: {service}
} = Ember;

export default Component.extend({

  // ----- Services -----
  ajaxStamplay: service(),
  store:        service(),



  // ----- Overridden properties -----
  classNames: ['signupForm'],



  // ----- Static properties -----
  user: computed(function () {
    return this
      .get('store')
      .createRecord('user', this.get('newUserDefaults'));
  }),

  newUserDefaults: {
     email:    'lolmaus+1@gmail.com',
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
  signup: task(function * () {
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
  }).drop()
});
