'use strict';

var processInclude = require('./util');

$(document).ready(function () {
    processInclude(require('./product/quickView'));
    processInclude(require('./product/tileResizer'));
});
