'use strict';
var processInclude = require('../util');
processInclude(require('../components/objectFit'));
var debounce = require('lodash/debounce');
/**
 * Resizes images to fit square "container" in the Product Tile experience
 */
function imageResize() {
    $(document).ready(function () {
        $('.tile-image').hide();
        var ic = $('.image-container').width();
        $('.tile-image').each(function () {
            $(this).width(ic).height(ic);
        });
        $('.tile-image').show();
    });
    window.onresize = debounce(imageResize, 50);
}

module.exports = {
    imageResize: imageResize
};

