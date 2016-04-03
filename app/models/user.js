// import Ember from 'ember';
//
// const {
//   computed
// } = Ember;

import User      from 'ember-stamplay/user';
import Validator from 'ember-model-validator/mixins/model-validator';
import attr      from 'ember-data/attr';
import {hasMany} from 'ember-data/relationships';

export default User.extend(Validator, {

  // ----- Attributes -----
  displayName: attr('string'),



  // ----- Relationships -----
  tasks: hasMany('task', {inverse: 'owner'}),



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
