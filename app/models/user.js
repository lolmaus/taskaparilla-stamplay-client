// import Ember from 'ember';
//
// const {
//   computed
// } = Ember;

import User      from 'ember-stamplay/user';
import Validator from 'ember-model-validator/mixins/model-validator';

export default User.extend(Validator, {

  // ----- Validations -----
  validations: {
    email: {
      presence: true
    },

    password: {
      presence: true
    }
  }
});
