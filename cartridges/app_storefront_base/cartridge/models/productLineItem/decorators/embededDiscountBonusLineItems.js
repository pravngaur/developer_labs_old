'use strict';

module.exports = function (object, lineItem) {
    Object.defineProperty(object, 'embededBonusDiscountLineItems', {
        enumerable: true,
        value: []
    });
};
