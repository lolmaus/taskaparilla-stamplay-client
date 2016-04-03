/* jshint ignore:start */
import Ember from 'ember';

const {
  Route,
  RSVP
} = Ember;

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  // ----- Overridden methods -----
  model () {
    return RSVP.hash({
      ...this.modelFor('application'),

      tasks: this.store.findAll('task')
    });
  }
});
