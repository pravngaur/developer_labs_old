'use strict';

var productHelper = require('*/cartridge/scripts/helpers/productHelpers');

module.exports = function (object, optionModel, variables, quantity, selectedOptions) {
    Object.defineProperty(object, 'options', {
        enumerable: true,
        value: (function () {
            var currentOptionModel = productHelper.getCurrentOptionModel(optionModel, selectedOptions);
            return productHelper.getOptions(currentOptionModel, { variables: variables, quantity: quantity });
        }())
    });
};
