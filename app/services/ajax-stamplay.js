import Ember from 'ember';

const {
  computed: {alias},
  inject:   {service}
} = Ember;

import AjaxStamplay from 'ember-stamplay/ajax';

export default AjaxStamplay.extend({

  // ----- Services -----
  config: service(),

  // ----- Overridden properties -----
  appId: alias('config.stamplayAppId')
});
