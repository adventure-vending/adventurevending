import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['adventure-list', 'col-md-10', 'col-md-offset-1'],

  store: Ember.inject.service(),

  newAdventure: {},

  currentSort: null,

  init() {
    this._super(...arguments);

    this.set('adventures', this.attrs.adventures.value);
    this.set('viewConfig', new Ember.Object());

    this.set('viewConfig.showTitle', true);
    this.set('viewConfig.showDescription', true);
    this.set('viewConfig.showLocation', true);
    this.set('viewConfig.showType', true);
    this.set('viewConfig.showEnabled', true);
  },

  actions: {
    add() {
      let title = this.get('newAdventure.title');
      let desc = this.get('newAdventure.desc');
      let loc = this.get('newAdventure.loc');
      let type = this.get('newAdventure.type');

      if (!title && !desc) {
        return;
      }

      this.get('store').createRecord('adventure', { title, desc, loc, type }).save();

      this.set('newAdventure', {});
    },
    remove(id) {
      let store = this.get('store');
      let record = store.peekRecord('adventure', id);
      store.deleteRecord(record);
      record.save();
    },
    sort(property, toReverse) {
      this.set('currentSort', property);

      let sortedAdventures = this.get('adventures').sortBy(property);

      if (toReverse) {
        sortedAdventures = sortedAdventures.reverse();
      }

      this.set('adventures', sortedAdventures);
    },
    toggleProperty(property) {
      this.toggleProperty(property);
    }
  }
});
