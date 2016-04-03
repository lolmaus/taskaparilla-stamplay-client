import Ember from 'ember';

const {
  Component,
  computed,
  inject: {service},
  on
} = Ember;

import {task} from 'ember-concurrency';

export default Component.extend({

  // ----- Arguments -----
  user: null,



  // ----- Services -----
  store: service(),



  // ----- Overridden properties -----
  classNames: ['newTask'],



  // ----- Static properties -----
  task: computed(function () {
    return this.getNewTask();
  }),



  // ----- Methods -----
  getNewTask () {
    const owner = this.get('user');

    return this
      .get('store')
      .createRecord('task', {owner});
  },

  attemptDeletingOldTask () {
    const oldTask = this.get('task');
    if (oldTask.get('isNew') && !oldTask.get('isSaving')) {
      oldTask.deleteRecord();
    }
  },

  reset () {
    this.attemptDeletingOldTask();

    const task = this.getNewTask();
    this.setProperties({task});
  },



  // ----- Events -----
  resetOnLeave: on('willDestroy', function () {
    this.reset();
  }),



  // ----- Tasks -----
  saveTask: task(function * () {
    yield this
      .get('task')
      .save()
      .then(() => {
        this.reset();
      });
  })
});
