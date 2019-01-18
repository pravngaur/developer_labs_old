'use strict';

var assert = require('chai').assert;
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();

var productMock = {
    longDescription: {
        markup: 'long description mark up'
    },
    shortDescription: {
        markup: 'short description mark up'
    }
};

var productDescription = {
    shortDescription: productMock.shortDescription,
    longDescription: productMock.longDescription
};


var productMockNoDescription = {};

describe('product description decorator', function () {
    var description = proxyquire('../../../../../../cartridges/app_storefront_base/cartridge/models/product/decorators/description', {
        '*/cartridge/scripts/helpers/productHelpers': {
            getProductDescriptions: function () { return productDescription; }
        }
    });

    var descriptionNull = proxyquire('../../../../../../cartridges/app_storefront_base/cartridge/models/product/decorators/description', {
        '*/cartridge/scripts/helpers/productHelpers': {
            getProductDescriptions: function () { return productMockNoDescription; }
        }
    });


    it('should create longDescription property for passed in object', function () {
        var object = {};
        description(object, productMock);

        assert.equal(object.longDescription, 'long description mark up');
    });

    it('should handle null long description', function () {
        var object = {};
        descriptionNull(object, productMockNoDescription);

        assert.equal(object.longDescription, null);
    });

    it('should create shortDescription property for passed in object', function () {
        var object = {};
        description(object, productMock);

        assert.equal(object.shortDescription, 'short description mark up');
    });

    it('should handle null short description', function () {
        var object = {};
        descriptionNull(object, productMockNoDescription);

        assert.equal(object.shortDescription, null);
    });
});
