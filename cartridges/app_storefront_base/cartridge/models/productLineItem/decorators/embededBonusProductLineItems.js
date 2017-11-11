'use strict';

module.exports = function (object, lineItem) {
    Object.defineProperty(object, 'embededBonusProductLineItems', {
        enumerable: true,
        value: []
    });
};
