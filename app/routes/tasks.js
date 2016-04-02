import Ember from 'ember';

const {
  inject: {service},
  Route,
  RSVP
} = Ember;

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  
  // ----- Services -----
  session: service(),  
  
  // ----- Overridden methods -----
  model () {
    return RSVP.hash({
      currentUser: this.get('session.currentUser')
    });
  }  
});
