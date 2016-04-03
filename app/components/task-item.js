import Ember from 'ember';

const {
  Component
} = Ember;

import {task} from 'ember-concurrency';

export default Component.extend({

  // ----- Arguments -----
  task: null,



  // ----- Overridden classnames -----
  classNames: ['taskItem'],



  // ----- Tasks -----
  deleteTask: task(function * () {
    yield this
      .get('task')
      .destroyRecord();
  })
});
