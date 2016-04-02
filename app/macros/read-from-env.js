import Ember from 'ember';
import _     from 'npm:lodash';

import ENV  from 'taskaparilla-stamplay-client/config/environment';


const {
  computed,
  get
} = Ember;

export function getValue (envPath, key, env = ENV) {
  let path = key;

  if (_.endsWith(envPath, '.')) {
    path = envPath + key;
  }

  else if (envPath) {
    path = envPath;
  }

  return get(env, path);
}

export function getDefaultValue (defaultValue) {
  return _.isFunction(defaultValue)
    ? defaultValue()
    : defaultValue;
}

// Reads value from ENV.
//
// `foo: readFromEnv()`          -- reads `ENV.foo`
// `foo: readFromEnv('bar')`     -- reads `ENV.bar`
// `foo: readFromEnv('foo.bar')` -- reads `ENV.foo.bar`
// `foo: readFromEnv('APP.')`    -- reads `ENV.APP.foo` (the trailing dot matters)
//
// If `defaultValue` is a function, its return value is used as default.

export default function(envPath, defaultValue, env = ENV) {
  let result;

  return computed({
    get (key) {
      const value = getValue(envPath, key, env);
      result = (value != null) ? value : getDefaultValue(defaultValue);
      return result;
    },

    set (key, value) {
      result = value;
      return result;
    }
  });
}
