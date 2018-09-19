'use strict';

var proxyquire = require('proxyquire').noCallThru().noPreserveCache();

var TotalsModel = require('./totals');
var ProductLineItemsModel = require('./productLineItems');

function proxyModel() {
    return proxyquire('../../../cartridges/app_storefront_base/cartridge/models/minicart', {
        '*/cartridge/models/totals': TotalsModel,
        '*/cartridge/models/productLineItems': ProductLineItemsModel,
        'dw/system/HookMgr': {
            callHook: function () {
                return { error: false, message: 'some message' };
            }
        },
        '*/cartridge/scripts/cart/cartHelpers': {
            getCartActionUrls: function () {
                return {
                    removeProductLineItemUrl: 'removeProductLineItemUrl',
                    updateQuantityUrl: 'updateQuantityUrl',
                    selectShippingUrl: 'selectShippingUrl',
                    submitCouponCodeUrl: 'submitCouponCodeUrl',
                    removeCouponLineItem: 'removeCouponLineItem'
                };
            }
        }
    });
}

module.exports = proxyModel();

