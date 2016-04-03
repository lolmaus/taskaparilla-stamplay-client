import Ember from 'ember';

const {
  computed: {alias, filterBy},
  Controller
} = Ember;

export default Controller.extend({
  
  // ----- Computed properties -----
  currentUser:   alias('model.currentUser'),
  tasks:         alias('model.tasks'),
  nonNewTasks:   filterBy('tasks',       'isNew',     false),
  existingTasks: filterBy('nonNewTasks', 'isDeleted', false)
});
