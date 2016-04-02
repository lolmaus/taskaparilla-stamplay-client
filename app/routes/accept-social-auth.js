import Ember from 'ember';

const {
  inject: {service},
  Route
} = Ember;

import QueryParamsResetRouteMixin from 'ember-query-params-reset/mixins/query-params-reset-route';

export default Route.extend(QueryParamsResetRouteMixin, {

  // ----- Services -----
  ajaxStamplay: service(),



  // ----- Overridden methods -----
  beforeModel ({queryParams: {jwt}}) {
    if (!jwt) {
      this.transitionTo('auth');
      return;
    }

    return this
      .get('ajaxStamplay')
      .restoreAndAuthenticate(jwt);
  }
});
