"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

import BaseAdapter from 'av-frontend/adapters/base';

export default BaseAdapter.extend({
});
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://127.0.0.1:8080',
  namespace: 'api'
});

import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',

  classNames: ['adventure-list-item'],

  store: Ember.inject.service(),

  isEditing: false,

  init() {
    this._super(...arguments);

    this.set('adventure.type', this.get('adventure.event_type.label'));
  },

  actions: {
    enableIsEditing() {
      this.set('isEditing', true);
    },
    disableIsEditing() {
      this.set('isEditing', false);
    },
    save() {
      this.get('store').findRecord('adventure', this.attrs.adventure.value.id).then((adventure) => {
        adventure.save();
      });

      this.set('isEditing', false);
    }
  }
});

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
    this.set('viewConfig.showCoin', true);
  },

  actions: {
    add() {
      let title = this.get('newAdventure.title');
      let desc = this.get('newAdventure.desc');
      let loc = this.get('newAdventure.loc');
      let type = this.get('newAdventure.type');
      let coin = this.get('newAdventure.coin');

      if (!title && !desc) {
        return;
      }

      this.get('store').createRecord('adventure', { title, desc, loc, type, coin }).save();

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

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['bootstrap-dropdown dropdown'],

  showDropdown: false,

  actions: {
    toggleDropdown() {
      this.toggleProperty('showDropdown');
    }
  }
});

import Ember from 'ember';

export const orderTypes = {
  none: null,
  forward: 'arrow-down',
  reverse: 'arrow-up'
};

export default Ember.Component.extend({
  tagName: 'th',

  classNames: ['column-head'],

  order: orderTypes.none,

  didUpdate() {
    this._super(...arguments);

    if (this.attrs.currentSort.value !== this.attrs.sortBy) {
      this.set('order', orderTypes.none);
    }
  },

  click() {
    let orderToUse = orderTypes.forward;

    if (this.get('order') === orderTypes.forward) {
      orderToUse = orderTypes.reverse;
    }

    this.set('order', orderToUse);
    this.attrs.sort(this.attrs.sortBy, orderToUse === orderTypes.reverse);
  }
});

import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page'],
  page: 0,

  actions: {
    prevPage() {
      if (this.get('page') !== 0) {
        this.decrementProperty('page');
      }
    },
    nextPage() {
      this.incrementProperty('page');
    }
  }
});
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

import Resolver from 'ember-resolver';

export default Resolver;

import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('edit-adventure', { path: '/edit-adventure/:adventure_id' });
});

export default Router;

import Ember from 'ember';

export default Ember.Route.extend({
  prefetch(params) {
    let id = params.adventure_id;
    let record = this.store.peekRecord('adventure', id);

    if (record === null) {
      record = this.store.find('adventure', id);
    }

    return record;
  }
});
import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    page: {
      refreshModel: true
    }
  },

  store: Ember.inject.service(),

  prefetch(params) {

    return Ember.RSVP.hash({
      adventures: this.store.query('adventure', params.queryParams)
    });
  }
});

export default Ember.HTMLBars.template((function() {
  return {
    meta: {
      "fragmentReason": {
        "name": "missing-wrapper",
        "problems": [
          "multiple-nodes",
          "wrong-type"
        ]
      },
      "revision": "Ember@2.4.6",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 5,
          "column": 10
        }
      },
      "moduleName": "av-frontend/templates/application.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("h2");
      dom.setAttribute(el1,"id","title");
      dom.setAttribute(el1,"class","col-md-offset-1");
      var el2 = dom.createTextNode("Adventure Vending");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("hr");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var morphs = new Array(1);
      morphs[0] = dom.createMorphAt(fragment,4,4,contextualElement);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["content","outlet",["loc",[null,[5,0],[5,10]]]]
    ],
    locals: [],
    templates: []
  };
}()));
export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 9,
              "column": 2
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["inline","input",[],["type","text","placeholder","Title","value",["subexpr","@mut",[["get","attrs.adventure.title",["loc",[null,[7,14],[7,35]]]]],[],[]]],["loc",[null,[4,6],[7,37]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 2
            },
            "end": {
              "line": 17,
              "column": 2
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["inline","input",[],["type","text","placeholder","Description","value",["subexpr","@mut",[["get","attrs.adventure.desc",["loc",[null,[15,14],[15,34]]]]],[],[]]],["loc",[null,[12,6],[15,36]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 2
            },
            "end": {
              "line": 25,
              "column": 2
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["inline","input",[],["type","text","placeholder","Location","value",["subexpr","@mut",[["get","attrs.adventure.loc",["loc",[null,[23,14],[23,33]]]]],[],[]]],["loc",[null,[20,6],[23,35]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 2
            },
            "end": {
              "line": 33,
              "column": 2
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["inline","input",[],["type","text","placeholder","Type","value",["subexpr","@mut",[["get","attrs.adventure.type",["loc",[null,[31,14],[31,34]]]]],[],[]]],["loc",[null,[28,6],[31,36]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child4 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 34,
              "column": 2
            },
            "end": {
              "line": 40,
              "column": 2
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["inline","input",[],["type","checkbox","checked",["subexpr","@mut",[["get","attrs.adventure.coin",["loc",[null,[38,16],[38,36]]]]],[],[]]],["loc",[null,[36,6],[38,38]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child5 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 41,
              "column": 2
            },
            "end": {
              "line": 47,
              "column": 2
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["inline","input",[],["type","checkbox","checked",["subexpr","@mut",[["get","attrs.adventure.enabled",["loc",[null,[45,16],[45,39]]]]],[],[]]],["loc",[null,[43,6],[45,41]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type",
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 54,
            "column": 0
          }
        },
        "moduleName": "av-frontend/templates/components/adventure-list-item.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("td");
        dom.setAttribute(el1,"title","Save");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2,"class","glyphicon glyphicon-ok");
        dom.setAttribute(el2,"aria-hidden","true");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("td");
        dom.setAttribute(el1,"title","Cancel");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2,"class","glyphicon glyphicon-remove");
        dom.setAttribute(el2,"aria-hidden","true");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element4 = dom.childAt(fragment, [7]);
        var element5 = dom.childAt(fragment, [9]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,1,1,contextualElement);
        morphs[2] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[3] = dom.createMorphAt(fragment,3,3,contextualElement);
        morphs[4] = dom.createMorphAt(fragment,4,4,contextualElement);
        morphs[5] = dom.createMorphAt(fragment,5,5,contextualElement);
        morphs[6] = dom.createElementMorph(element4);
        morphs[7] = dom.createElementMorph(element5);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["block","if",[["get","attrs.viewConfig.showTitle",["loc",[null,[2,8],[2,34]]]]],[],0,null,["loc",[null,[2,2],[9,9]]]],
        ["block","if",[["get","attrs.viewConfig.showDescription",["loc",[null,[10,8],[10,40]]]]],[],1,null,["loc",[null,[10,2],[17,9]]]],
        ["block","if",[["get","attrs.viewConfig.showLocation",["loc",[null,[18,8],[18,37]]]]],[],2,null,["loc",[null,[18,2],[25,9]]]],
        ["block","if",[["get","attrs.viewConfig.showType",["loc",[null,[26,8],[26,33]]]]],[],3,null,["loc",[null,[26,2],[33,9]]]],
        ["block","if",[["get","attrs.viewConfig.showCoin",["loc",[null,[34,8],[34,33]]]]],[],4,null,["loc",[null,[34,2],[40,9]]]],
        ["block","if",[["get","attrs.viewConfig.showEnabled",["loc",[null,[41,8],[41,36]]]]],[],5,null,["loc",[null,[41,2],[47,9]]]],
        ["element","action",["save"],[],["loc",[null,[48,6],[48,23]]]],
        ["element","action",["disableIsEditing"],[],["loc",[null,[51,6],[51,35]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5]
    };
  }());
  var child1 = (function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 55,
              "column": 2
            },
            "end": {
              "line": 57,
              "column": 2
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
          return morphs;
        },
        statements: [
          ["content","attrs.adventure.title",["loc",[null,[56,8],[56,33]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 58,
              "column": 2
            },
            "end": {
              "line": 60,
              "column": 2
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
          return morphs;
        },
        statements: [
          ["content","attrs.adventure.desc",["loc",[null,[59,8],[59,32]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 61,
              "column": 2
            },
            "end": {
              "line": 63,
              "column": 2
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
          return morphs;
        },
        statements: [
          ["content","attrs.adventure.loc",["loc",[null,[62,8],[62,31]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 64,
              "column": 2
            },
            "end": {
              "line": 66,
              "column": 2
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
          return morphs;
        },
        statements: [
          ["content","attrs.adventure.type",["loc",[null,[65,8],[65,32]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child4 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 67,
              "column": 2
            },
            "end": {
              "line": 71,
              "column": 2
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("input");
          dom.setAttribute(el2,"type","checkbox");
          dom.setAttribute(el2,"disabled","");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          if (this.cachedFragment) { dom.repairClonedNode(dom.childAt(fragment, [1, 1]),[],true); }
          var element1 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element1, 'checked');
          return morphs;
        },
        statements: [
          ["attribute","checked",["get","attrs.adventure.coin",["loc",[null,[69,48],[69,68]]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child5 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 72,
              "column": 2
            },
            "end": {
              "line": 76,
              "column": 2
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("input");
          dom.setAttribute(el2,"type","checkbox");
          dom.setAttribute(el2,"disabled","");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          if (this.cachedFragment) { dom.repairClonedNode(dom.childAt(fragment, [1, 1]),[],true); }
          var element0 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'checked');
          return morphs;
        },
        statements: [
          ["attribute","checked",["get","attrs.adventure.enabled",["loc",[null,[74,48],[74,71]]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 54,
            "column": 0
          },
          "end": {
            "line": 83,
            "column": 0
          }
        },
        "moduleName": "av-frontend/templates/components/adventure-list-item.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("td");
        dom.setAttribute(el1,"title","Edit");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2,"class","glyphicon glyphicon-pencil");
        dom.setAttribute(el2,"aria-hidden","true");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("td");
        dom.setAttribute(el1,"title","Remove");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2,"class","glyphicon glyphicon-trash");
        dom.setAttribute(el2,"aria-hidden","true");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [7]);
        var element3 = dom.childAt(fragment, [9]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,1,1,contextualElement);
        morphs[2] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[3] = dom.createMorphAt(fragment,3,3,contextualElement);
        morphs[4] = dom.createMorphAt(fragment,4,4,contextualElement);
        morphs[5] = dom.createMorphAt(fragment,5,5,contextualElement);
        morphs[6] = dom.createElementMorph(element2);
        morphs[7] = dom.createElementMorph(element3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["block","if",[["get","attrs.viewConfig.showTitle",["loc",[null,[55,8],[55,34]]]]],[],0,null,["loc",[null,[55,2],[57,9]]]],
        ["block","if",[["get","attrs.viewConfig.showDescription",["loc",[null,[58,8],[58,40]]]]],[],1,null,["loc",[null,[58,2],[60,9]]]],
        ["block","if",[["get","attrs.viewConfig.showLocation",["loc",[null,[61,8],[61,37]]]]],[],2,null,["loc",[null,[61,2],[63,9]]]],
        ["block","if",[["get","attrs.viewConfig.showType",["loc",[null,[64,8],[64,33]]]]],[],3,null,["loc",[null,[64,2],[66,9]]]],
        ["block","if",[["get","attrs.viewConfig.showCoin",["loc",[null,[67,8],[67,33]]]]],[],4,null,["loc",[null,[67,2],[71,9]]]],
        ["block","if",[["get","attrs.viewConfig.showEnabled",["loc",[null,[72,8],[72,36]]]]],[],5,null,["loc",[null,[72,2],[76,9]]]],
        ["element","action",["enableIsEditing"],[],["loc",[null,[77,6],[77,34]]]],
        ["element","action",[["get","attrs.remove",["loc",[null,[80,15],[80,27]]]],["get","attrs.adventure.id",["loc",[null,[80,28],[80,46]]]]],[],["loc",[null,[80,6],[80,48]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5]
    };
  }());
  return {
    meta: {
      "fragmentReason": {
        "name": "missing-wrapper",
        "problems": [
          "wrong-type"
        ]
      },
      "revision": "Ember@2.4.6",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 83,
          "column": 7
        }
      },
      "moduleName": "av-frontend/templates/components/adventure-list-item.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var morphs = new Array(1);
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      dom.insertBoundary(fragment, 0);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["block","if",[["get","isEditing",["loc",[null,[1,6],[1,15]]]]],[],0,1,["loc",[null,[1,0],[83,7]]]]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));
export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 25,
              "column": 8
            },
            "end": {
              "line": 25,
              "column": 89
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Title");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 24,
            "column": 6
          },
          "end": {
            "line": 26,
            "column": 6
          }
        },
        "moduleName": "av-frontend/templates/components/adventure-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("        ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        return morphs;
      },
      statements: [
        ["block","column-head",[],["sort",["subexpr","action",["sort"],[],["loc",[null,[25,28],[25,43]]]],"sortBy","title","currentSort",["subexpr","@mut",[["get","currentSort",["loc",[null,[25,71],[25,82]]]]],[],[]]],0,null,["loc",[null,[25,8],[25,105]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }());
  var child1 = (function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 28,
              "column": 8
            },
            "end": {
              "line": 28,
              "column": 94
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Description");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 27,
            "column": 6
          },
          "end": {
            "line": 29,
            "column": 6
          }
        },
        "moduleName": "av-frontend/templates/components/adventure-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("        ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        return morphs;
      },
      statements: [
        ["block","column-head",[],["sort",["subexpr","action",["sort"],[],["loc",[null,[28,28],[28,43]]]],"sortBy","desc","currentSort",["subexpr","@mut",[["get","currentSort",["loc",[null,[28,70],[28,81]]]]],[],[]]],0,null,["loc",[null,[28,8],[28,110]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }());
  var child2 = (function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 31,
              "column": 8
            },
            "end": {
              "line": 31,
              "column": 90
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Location");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 30,
            "column": 6
          },
          "end": {
            "line": 32,
            "column": 6
          }
        },
        "moduleName": "av-frontend/templates/components/adventure-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("        ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        return morphs;
      },
      statements: [
        ["block","column-head",[],["sort",["subexpr","action",["sort"],[],["loc",[null,[31,28],[31,43]]]],"sortBy","loc","currentSort",["subexpr","@mut",[["get","currentSort",["loc",[null,[31,69],[31,80]]]]],[],[]]],0,null,["loc",[null,[31,8],[31,106]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }());
  var child3 = (function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 34,
              "column": 8
            },
            "end": {
              "line": 34,
              "column": 87
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Type");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 33,
            "column": 6
          },
          "end": {
            "line": 35,
            "column": 6
          }
        },
        "moduleName": "av-frontend/templates/components/adventure-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("        ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        return morphs;
      },
      statements: [
        ["block","column-head",[],["sort",["subexpr","action",["sort"],[],["loc",[null,[34,28],[34,43]]]],"sortBy","type","currentSort",["subexpr","@mut",[["get","currentSort",["loc",[null,[34,70],[34,81]]]]],[],[]]],0,null,["loc",[null,[34,8],[34,103]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }());
  var child4 = (function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 37,
              "column": 8
            },
            "end": {
              "line": 37,
              "column": 87
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Coin");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 36,
            "column": 6
          },
          "end": {
            "line": 38,
            "column": 6
          }
        },
        "moduleName": "av-frontend/templates/components/adventure-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("        ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        return morphs;
      },
      statements: [
        ["block","column-head",[],["sort",["subexpr","action",["sort"],[],["loc",[null,[37,28],[37,43]]]],"sortBy","coin","currentSort",["subexpr","@mut",[["get","currentSort",["loc",[null,[37,70],[37,81]]]]],[],[]]],0,null,["loc",[null,[37,8],[37,103]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }());
  var child5 = (function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.6",
          "loc": {
            "source": null,
            "start": {
              "line": 40,
              "column": 8
            },
            "end": {
              "line": 40,
              "column": 93
            }
          },
          "moduleName": "av-frontend/templates/components/adventure-list.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Enabled");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 39,
            "column": 6
          },
          "end": {
            "line": 41,
            "column": 6
          }
        },
        "moduleName": "av-frontend/templates/components/adventure-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("        ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        return morphs;
      },
      statements: [
        ["block","column-head",[],["sort",["subexpr","action",["sort"],[],["loc",[null,[40,28],[40,43]]]],"sortBy","enabled","currentSort",["subexpr","@mut",[["get","currentSort",["loc",[null,[40,73],[40,84]]]]],[],[]]],0,null,["loc",[null,[40,8],[40,109]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }());
  var child6 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 46,
            "column": 4
          },
          "end": {
            "line": 51,
            "column": 4
          }
        },
        "moduleName": "av-frontend/templates/components/adventure-list.hbs"
      },
      isEmpty: false,
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("      ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        return morphs;
      },
      statements: [
        ["inline","adventure-list-item",[],["adventure",["subexpr","mut",[["get","adventure",["loc",[null,[48,23],[48,32]]]]],[],["loc",[null,[48,18],[48,33]]]],"viewConfig",["subexpr","@mut",[["get","viewConfig",["loc",[null,[49,19],[49,29]]]]],[],[]],"remove",["subexpr","action",["remove",["get","adventure.id",["loc",[null,[50,32],[50,44]]]]],[],["loc",[null,[50,15],[50,45]]]]],["loc",[null,[47,6],[50,47]]]]
      ],
      locals: ["adventure"],
      templates: []
    };
  }());
  var child7 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 53,
            "column": 6
          },
          "end": {
            "line": 60,
            "column": 6
          }
        },
        "moduleName": "av-frontend/templates/components/adventure-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("        ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("td");
        var el2 = dom.createTextNode("\n          ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
        return morphs;
      },
      statements: [
        ["inline","input",[],["type","text","placeholder","Title","value",["subexpr","@mut",[["get","newAdventure.title",["loc",[null,[58,18],[58,36]]]]],[],[]]],["loc",[null,[55,10],[58,38]]]]
      ],
      locals: [],
      templates: []
    };
  }());
  var child8 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 61,
            "column": 6
          },
          "end": {
            "line": 68,
            "column": 6
          }
        },
        "moduleName": "av-frontend/templates/components/adventure-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("        ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("td");
        var el2 = dom.createTextNode("\n          ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
        return morphs;
      },
      statements: [
        ["inline","input",[],["type","text","placeholder","Description","value",["subexpr","@mut",[["get","newAdventure.desc",["loc",[null,[66,18],[66,35]]]]],[],[]]],["loc",[null,[63,10],[66,37]]]]
      ],
      locals: [],
      templates: []
    };
  }());
  var child9 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 69,
            "column": 6
          },
          "end": {
            "line": 76,
            "column": 6
          }
        },
        "moduleName": "av-frontend/templates/components/adventure-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("        ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("td");
        var el2 = dom.createTextNode("\n          ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
        return morphs;
      },
      statements: [
        ["inline","input",[],["type","text","placeholder","Location","value",["subexpr","@mut",[["get","newAdventure.loc",["loc",[null,[74,18],[74,34]]]]],[],[]]],["loc",[null,[71,10],[74,36]]]]
      ],
      locals: [],
      templates: []
    };
  }());
  var child10 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 77,
            "column": 6
          },
          "end": {
            "line": 84,
            "column": 6
          }
        },
        "moduleName": "av-frontend/templates/components/adventure-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("        ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("td");
        var el2 = dom.createTextNode("\n          ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
        return morphs;
      },
      statements: [
        ["inline","input",[],["type","text","placeholder","Type","value",["subexpr","@mut",[["get","newAdventure.type",["loc",[null,[82,18],[82,35]]]]],[],[]]],["loc",[null,[79,10],[82,37]]]]
      ],
      locals: [],
      templates: []
    };
  }());
  var child11 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 85,
            "column": 6
          },
          "end": {
            "line": 87,
            "column": 6
          }
        },
        "moduleName": "av-frontend/templates/components/adventure-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("        ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("td");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child12 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 88,
            "column": 6
          },
          "end": {
            "line": 90,
            "column": 6
          }
        },
        "moduleName": "av-frontend/templates/components/adventure-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("        ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("td");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  return {
    meta: {
      "fragmentReason": {
        "name": "missing-wrapper",
        "problems": [
          "multiple-nodes"
        ]
      },
      "revision": "Ember@2.4.6",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 96,
          "column": 8
        }
      },
      "moduleName": "av-frontend/templates/components/adventure-list.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("p");
      var el2 = dom.createTextNode("\nUse control + F to search\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","btn-group");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("button");
      dom.setAttribute(el2,"class","btn btn-secondary");
      var el3 = dom.createTextNode("Toggle Title");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("button");
      dom.setAttribute(el2,"class","btn btn-secondary");
      var el3 = dom.createTextNode("Toggle Description");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("button");
      dom.setAttribute(el2,"class","btn btn-secondary");
      var el3 = dom.createTextNode("Toggle Location");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("button");
      dom.setAttribute(el2,"class","btn btn-secondary");
      var el3 = dom.createTextNode("Toggle Type");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("button");
      dom.setAttribute(el2,"class","btn btn-secondary");
      var el3 = dom.createTextNode("Toggle Coin");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("button");
      dom.setAttribute(el2,"class","btn btn-secondary");
      var el3 = dom.createTextNode("Toggle Enabled");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("table");
      dom.setAttribute(el1,"class","table table-striped");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("thead");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("tr");
      var el4 = dom.createTextNode("\n");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("th");
      dom.setAttribute(el4,"colspan","2");
      var el5 = dom.createTextNode("Actions");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("tbody");
      var el3 = dom.createTextNode("\n");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("tr");
      var el4 = dom.createTextNode("\n");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("td");
      dom.setAttribute(el4,"colspan","2");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("span");
      dom.setAttribute(el5,"class","glyphicon glyphicon-plus");
      dom.setAttribute(el5,"aria-hidden","true");
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [3]);
      var element1 = dom.childAt(element0, [1]);
      var element2 = dom.childAt(element0, [3]);
      var element3 = dom.childAt(element0, [5]);
      var element4 = dom.childAt(element0, [7]);
      var element5 = dom.childAt(element0, [9]);
      var element6 = dom.childAt(element0, [11]);
      var element7 = dom.childAt(fragment, [5]);
      var element8 = dom.childAt(element7, [1, 1]);
      var element9 = dom.childAt(element7, [3]);
      var element10 = dom.childAt(element9, [3]);
      var element11 = dom.childAt(element10, [8, 1]);
      var morphs = new Array(20);
      morphs[0] = dom.createElementMorph(element1);
      morphs[1] = dom.createElementMorph(element2);
      morphs[2] = dom.createElementMorph(element3);
      morphs[3] = dom.createElementMorph(element4);
      morphs[4] = dom.createElementMorph(element5);
      morphs[5] = dom.createElementMorph(element6);
      morphs[6] = dom.createMorphAt(element8,1,1);
      morphs[7] = dom.createMorphAt(element8,2,2);
      morphs[8] = dom.createMorphAt(element8,3,3);
      morphs[9] = dom.createMorphAt(element8,4,4);
      morphs[10] = dom.createMorphAt(element8,5,5);
      morphs[11] = dom.createMorphAt(element8,6,6);
      morphs[12] = dom.createMorphAt(element9,1,1);
      morphs[13] = dom.createMorphAt(element10,1,1);
      morphs[14] = dom.createMorphAt(element10,2,2);
      morphs[15] = dom.createMorphAt(element10,3,3);
      morphs[16] = dom.createMorphAt(element10,4,4);
      morphs[17] = dom.createMorphAt(element10,5,5);
      morphs[18] = dom.createMorphAt(element10,6,6);
      morphs[19] = dom.createElementMorph(element11);
      return morphs;
    },
    statements: [
      ["element","action",[["get","toggleProperty",["loc",[null,[13,45],[13,59]]]],"viewConfig.showTitle"],[],["loc",[null,[13,36],[13,84]]]],
      ["element","action",[["get","toggleProperty",["loc",[null,[14,45],[14,59]]]],"viewConfig.showDescription"],[],["loc",[null,[14,36],[14,90]]]],
      ["element","action",[["get","toggleProperty",["loc",[null,[15,45],[15,59]]]],"viewConfig.showLocation"],[],["loc",[null,[15,36],[15,87]]]],
      ["element","action",[["get","toggleProperty",["loc",[null,[16,45],[16,59]]]],"viewConfig.showType"],[],["loc",[null,[16,36],[16,83]]]],
      ["element","action",[["get","toggleProperty",["loc",[null,[17,45],[17,59]]]],"viewConfig.showCoin"],[],["loc",[null,[17,36],[17,83]]]],
      ["element","action",[["get","toggleProperty",["loc",[null,[18,45],[18,59]]]],"viewConfig.showEnabled"],[],["loc",[null,[18,36],[18,86]]]],
      ["block","if",[["get","viewConfig.showTitle",["loc",[null,[24,12],[24,32]]]]],[],0,null,["loc",[null,[24,6],[26,13]]]],
      ["block","if",[["get","viewConfig.showDescription",["loc",[null,[27,12],[27,38]]]]],[],1,null,["loc",[null,[27,6],[29,13]]]],
      ["block","if",[["get","viewConfig.showLocation",["loc",[null,[30,12],[30,35]]]]],[],2,null,["loc",[null,[30,6],[32,13]]]],
      ["block","if",[["get","viewConfig.showType",["loc",[null,[33,12],[33,31]]]]],[],3,null,["loc",[null,[33,6],[35,13]]]],
      ["block","if",[["get","viewConfig.showCoin",["loc",[null,[36,12],[36,31]]]]],[],4,null,["loc",[null,[36,6],[38,13]]]],
      ["block","if",[["get","viewConfig.showEnabled",["loc",[null,[39,12],[39,34]]]]],[],5,null,["loc",[null,[39,6],[41,13]]]],
      ["block","each",[["get","adventures",["loc",[null,[46,12],[46,22]]]]],[],6,null,["loc",[null,[46,4],[51,13]]]],
      ["block","if",[["get","viewConfig.showTitle",["loc",[null,[53,12],[53,32]]]]],[],7,null,["loc",[null,[53,6],[60,13]]]],
      ["block","if",[["get","viewConfig.showDescription",["loc",[null,[61,12],[61,38]]]]],[],8,null,["loc",[null,[61,6],[68,13]]]],
      ["block","if",[["get","viewConfig.showLocation",["loc",[null,[69,12],[69,35]]]]],[],9,null,["loc",[null,[69,6],[76,13]]]],
      ["block","if",[["get","viewConfig.showType",["loc",[null,[77,12],[77,31]]]]],[],10,null,["loc",[null,[77,6],[84,13]]]],
      ["block","if",[["get","viewConfig.showCoin",["loc",[null,[85,12],[85,31]]]]],[],11,null,["loc",[null,[85,6],[87,13]]]],
      ["block","if",[["get","viewConfig.showEnabled",["loc",[null,[88,12],[88,34]]]]],[],12,null,["loc",[null,[88,6],[90,13]]]],
      ["element","action",["add"],[],["loc",[null,[92,14],[92,30]]]]
    ],
    locals: [],
    templates: [child0, child1, child2, child3, child4, child5, child6, child7, child8, child9, child10, child11, child12]
  };
}()));
export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 5,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "av-frontend/templates/components/bootstrap/bootstrap-dropdown.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1,"class","dropdown-menu");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("a");
        var el4 = dom.createTextNode("Title");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("a");
        var el4 = dom.createTextNode("Description");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("a");
        var el4 = dom.createTextNode("Enabled");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var element3 = dom.childAt(element0, [5]);
        var morphs = new Array(3);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createElementMorph(element2);
        morphs[2] = dom.createElementMorph(element3);
        return morphs;
      },
      statements: [
        ["element","action",[["get","toggleTitle",["loc",[null,[7,17],[7,28]]]]],[],["loc",[null,[7,8],[7,30]]]],
        ["element","action",[["get","toggleDescription",["loc",[null,[8,17],[8,34]]]]],[],["loc",[null,[8,8],[8,36]]]],
        ["element","action",[["get","toggleEnabled",["loc",[null,[9,17],[9,30]]]]],[],["loc",[null,[9,8],[9,32]]]]
      ],
      locals: [],
      templates: []
    };
  }());
  return {
    meta: {
      "fragmentReason": {
        "name": "missing-wrapper",
        "problems": [
          "multiple-nodes",
          "wrong-type"
        ]
      },
      "revision": "Ember@2.4.6",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 11,
          "column": 7
        }
      },
      "moduleName": "av-frontend/templates/components/bootstrap/bootstrap-dropdown.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("button");
      dom.setAttribute(el1,"class","btn btn-default dropdown-toggle");
      var el2 = dom.createTextNode("\n  Show/Hide Columns\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("span");
      dom.setAttribute(el2,"class","caret");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element4 = dom.childAt(fragment, [0]);
      var morphs = new Array(2);
      morphs[0] = dom.createElementMorph(element4);
      morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["element","action",["toggleDropdown"],[],["loc",[null,[1,48],[1,75]]]],
      ["block","if",[["get","showDropdown",["loc",[null,[5,6],[5,18]]]]],[],0,null,["loc",[null,[5,0],[11,7]]]]
    ],
    locals: [],
    templates: [child0]
  };
}()));
export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 2,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "av-frontend/templates/components/column-head.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        dom.setAttribute(el1,"aria-hidden","true");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var morphs = new Array(1);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        return morphs;
      },
      statements: [
        ["attribute","class",["subexpr","concat",["glyphicon glyphicon-",["get","order",["loc",[null,[3,46],[3,51]]]]],[],["loc",[null,[3,14],[3,53]]]]]
      ],
      locals: [],
      templates: []
    };
  }());
  var child1 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.6",
        "loc": {
          "source": null,
          "start": {
            "line": 4,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "av-frontend/templates/components/column-head.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        dom.setAttribute(el1,"class","icon-placeholder");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  return {
    meta: {
      "fragmentReason": {
        "name": "missing-wrapper",
        "problems": [
          "wrong-type",
          "multiple-nodes"
        ]
      },
      "revision": "Ember@2.4.6",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 7,
          "column": 0
        }
      },
      "moduleName": "av-frontend/templates/components/column-head.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var morphs = new Array(2);
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
      dom.insertBoundary(fragment, 0);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["content","yield",["loc",[null,[1,0],[1,9]]]],
      ["block","if",[["get","order",["loc",[null,[2,6],[2,11]]]]],[],0,1,["loc",[null,[2,0],[6,7]]]]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));
export default Ember.HTMLBars.template((function() {
  return {
    meta: {
      "fragmentReason": {
        "name": "missing-wrapper",
        "problems": [
          "multiple-nodes"
        ]
      },
      "revision": "Ember@2.4.6",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 11,
          "column": 0
        }
      },
      "moduleName": "av-frontend/templates/index.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","btn-toolbar");
      dom.setAttribute(el1,"role","toolbar");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","btn-group");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("button");
      dom.setAttribute(el3,"class","btn");
      var el4 = dom.createTextNode("back");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("button");
      dom.setAttribute(el3,"class","btn");
      var el4 = dom.createTextNode("next");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","row");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0, 1]);
      var element1 = dom.childAt(element0, [1]);
      var element2 = dom.childAt(element0, [3]);
      var morphs = new Array(3);
      morphs[0] = dom.createElementMorph(element1);
      morphs[1] = dom.createElementMorph(element2);
      morphs[2] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
      return morphs;
    },
    statements: [
      ["element","action",["prevPage"],[],["loc",[null,[3,24],[3,45]]]],
      ["element","action",["nextPage"],[],["loc",[null,[4,24],[4,45]]]],
      ["inline","adventure-list",[],["adventures",["subexpr","@mut",[["get","model.adventures",["loc",[null,[9,30],[9,46]]]]],[],[]]],["loc",[null,[9,2],[9,48]]]]
    ],
    locals: [],
    templates: []
  };
}()));
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('av-frontend/config/environment', ['ember'], function(Ember) {
  var prefix = 'av-frontend';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("av-frontend/app")["default"].create({});
}

/* jshint ignore:end */
//# sourceMappingURL=av-frontend.map