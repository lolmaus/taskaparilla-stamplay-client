import Model       from 'ember-data/model';
import attr        from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';
import Validator   from 'ember-model-validator/mixins/model-validator';

export default Model.extend(Validator, {

  // ----- Attributes -----
  name: attr('string'),



  // ----- Relationships -----
  owner: belongsTo('user'),



  // ----- Validations -----
  validations: {
    name: {
      presence: true
    }
  }
});
