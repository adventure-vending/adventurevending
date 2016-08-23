define('av-frontend/tests/adapters/adventure.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - adapters/adventure.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/adventure.js should pass jshint.');
  });
});
define('av-frontend/tests/adapters/base.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - adapters/base.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/base.js should pass jshint.');
  });
});
define('av-frontend/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('av-frontend/tests/components/adventure-list-item.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/adventure-list-item.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/adventure-list-item.js should pass jshint.');
  });
});
define('av-frontend/tests/components/adventure-list.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/adventure-list.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/adventure-list.js should pass jshint.');
  });
});
define('av-frontend/tests/components/bootstrap/bootstrap-dropdown.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/bootstrap/bootstrap-dropdown.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/bootstrap/bootstrap-dropdown.js should pass jshint.');
  });
});
define('av-frontend/tests/components/column-head.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/column-head.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/column-head.js should pass jshint.');
  });
});
define('av-frontend/tests/controllers/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/index.js should pass jshint.');
  });
});
define('av-frontend/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('av-frontend/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('av-frontend/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'av-frontend/tests/helpers/start-app', 'av-frontend/tests/helpers/destroy-app'], function (exports, _qunit, _avFrontendTestsHelpersStartApp, _avFrontendTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _avFrontendTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _avFrontendTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('av-frontend/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('av-frontend/tests/helpers/resolver', ['exports', 'av-frontend/resolver', 'av-frontend/config/environment'], function (exports, _avFrontendResolver, _avFrontendConfigEnvironment) {

  var resolver = _avFrontendResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _avFrontendConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _avFrontendConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('av-frontend/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('av-frontend/tests/helpers/start-app', ['exports', 'ember', 'av-frontend/app', 'av-frontend/config/environment'], function (exports, _ember, _avFrontendApp, _avFrontendConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _avFrontendConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _avFrontendApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('av-frontend/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('av-frontend/tests/models/adventure.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/adventure.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/adventure.js should pass jshint.');
  });
});
define('av-frontend/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('av-frontend/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('av-frontend/tests/routes/edit-adventure.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/edit-adventure.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/edit-adventure.js should pass jshint.');
  });
});
define('av-frontend/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('av-frontend/tests/test-helper', ['exports', 'av-frontend/tests/helpers/resolver', 'ember-qunit'], function (exports, _avFrontendTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_avFrontendTestsHelpersResolver['default']);
});
define('av-frontend/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('av-frontend/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map