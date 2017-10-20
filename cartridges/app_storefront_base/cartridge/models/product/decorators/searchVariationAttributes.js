'use strict';

var ATTRIBUTE_NAME = 'color';
var collections = require('*/cartridge/scripts/util/collections');

module.exports = function (object, hit) {
    Object.defineProperty(object, 'variationAttributes', {
        enumerable: true,
        value: (function () {
            var colors = hit.getRepresentedVariationValues(ATTRIBUTE_NAME);

            return [{
                attributeId: 'color',
                id: 'color',
                swatchable: true,
                values: collections.map(colors, function (color) {
                    var apiImage = color.getImage('swatch', 0);
                    return {
                        id: color.ID,
                        description: color.description,
                        displayValue: color.displayValue,
                        value: color.value,
                        selectable: true,
                        selected: true,
                        images: {
                            swatch: [{
                                alt: apiImage.alt,
                                url: apiImage.URL.toString(),
                                title: apiImage.title
                            }]
                        }
                    };
                })
            }];
        }())
    });
};
