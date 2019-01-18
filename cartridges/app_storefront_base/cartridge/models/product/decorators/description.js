'use strict';

module.exports = function (object, product) {
    var productDescriptions = require('*/cartridge/scripts/helpers/productHelpers').getProductDescriptions(product);
    var longDescription = productDescriptions.longDescription;
    var shortDescription = productDescriptions.shortDescription;
    Object.defineProperty(object, 'longDescription', {
        enumerable: true,
        value: longDescription ? longDescription.markup : null
    });
    Object.defineProperty(object, 'shortDescription', {
        enumerable: true,
        value: shortDescription ? shortDescription.markup : null
    });
};
