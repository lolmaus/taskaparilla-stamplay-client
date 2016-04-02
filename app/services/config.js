import Ember from 'ember';

const {
  Service
} = Ember;

import readFromEnv from 'taskaparilla-stamplay-client/macros/read-from-env';

export default Service.extend({
  stamplayAppId: readFromEnv('stamplay.appId')
});
