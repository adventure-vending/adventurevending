import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  desc: DS.attr('string'),
  loc: DS.attr('string'),
  type: DS.attr('string'),
  event_type: DS.attr(),
  coin: DS.attr('boolean', {defaultValue: false }),
  enabled: DS.attr('boolean', { defaultValue: true })
});
