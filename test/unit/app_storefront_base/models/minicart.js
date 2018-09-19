'use strict';

var assert = require('chai').assert;
var ArrayList = require('../../../mocks/dw.util.Collection');

var toProductMock = require('../../../util');

var productVariantMock = {
    ID: '1234567',
    name: 'test product',
    variant: true,
    availabilityModel: {
        isOrderable: {
            return: true,
            type: 'function'
        },
        inventoryRecord: {
            ATS: {
                value: 100
            }
        }
    },
    minOrderQuantity: {
        value: 2
    }
};

var productMock = {
    variationModel: {
        productVariationAttributes: new ArrayList([{
            attributeID: '',
            value: ''
        }]),
        selectedVariant: productVariantMock
    }
};

var Money = require('../../../mocks/dw.value.Money');


var createApiBasket = function (options) {
    var safeOptions = options || {};

    var basket = {
        allProductLineItems: new ArrayList([{
            bonusProductLineItem: false,
            gift: false,
            UUID: 'some UUID',
            adjustedPrice: {
                value: 'some value',
                currencyCode: 'US'
            },
            quantity: {
                value: 1
            },
            product: toProductMock(productMock)
        }]),
        totalGrossPrice: new Money(true),
        totalTax: new Money(true),
        shippingTotalPrice: new Money(true)
    };


    basket.getAdjustedMerchandizeTotalPrice = function () {
        return new Money(true);
    };

    if (safeOptions.productLineItems) {
        basket.productLineItems = safeOptions.productLineItems;
    }

    if (safeOptions.totals) {
        basket.totals = safeOptions.totals;
    }

    return basket;
};

describe('minicart', function () {
    var MiniCart = require('../../../mocks/models/minicart');

    it('should accept/process a null Basket object', function () {
        var nullBasket = null;
        var result = new MiniCart(nullBasket);

        assert.equal(result.items.length, 0);
        assert.equal(result.numItems, 0);
    });

    it('should get totals from totals model', function () {
        var result = new MiniCart(createApiBasket());
        assert.equal(result.totals.subTotal, 'formatted money');
        assert.equal(result.totals.grandTotal, 'formatted money');
        assert.equal(result.totals.totalTax, 'formatted money');
        assert.equal(result.totals.totalShippingCost, 'formatted money');
    });
});

