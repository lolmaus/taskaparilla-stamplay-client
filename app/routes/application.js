import Ember from 'ember';

const {
  inject: {service},
  Route,
  RSVP
} = Ember;

import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {

  // ----- Services -----
  session: service(),



  // ----- Overridden methods -----
  model () {
    return RSVP.hash({
      currentUser: this.get('session.currentUser')
    });
  },



  // ----- Actions -----
  actions: {
    logout () {
      this.get('session').invalidate();
    }
  }
});
