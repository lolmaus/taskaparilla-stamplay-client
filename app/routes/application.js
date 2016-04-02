import Ember from 'ember';

const {
  inject: {service},
  Route
} = Ember;

import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {

  // ----- Services -----
  session: service(),

  // ----- Actions -----
  actions: {
    logout () {
      this.get('session').invalidate();
    }
  }
});
