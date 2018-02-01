'use strict';

var assert = require('chai').assert;
var ShippingStateModel = require('../../../mocks/models/shippingState.js');

var orderMock = {
    shipping: [{
        UUID: '123',
        selectedShippingMethod: {
            storePickupEnabled: true,
            ID: '009'
        },
        shippingAddress: 'someStoreForPickUp'
    }]
};

var orderMock2 = {
    shipping: [{
        UUID: '345',
        selectedShippingMethod: {
            storePickupEnabled: false,
            ID: '008'
        },
        shippingAddress: 'someAddressForDelivery'
    }]

};

describe('shippingState', function () {
    it('should receive an null shippingState', function () {
        var result = new ShippingStateModel(null);
        assert.deepEqual(result.shippingState, null);
    });

    it('should return an address for pickup in store', function () {
        var result = new ShippingStateModel(orderMock);
        assert.equal(result.shippingState[0].shipmentUUID, '123');
        assert.equal(result.shippingState[0].methodID, '009');
        assert.equal(result.shippingState[0].pickupAddress, 'someStoreForPickUp');
        assert.isTrue(result.shippingState[0].pickupEnabled, true);
    });


    it('should return an address for delivery', function () {
        var result = new ShippingStateModel(orderMock2);
        assert.equal(result.shippingState[0].shipmentUUID, '345');
        assert.equal(result.shippingState[0].methodID, '008');
        assert.equal(result.shippingState[0].deliveryAddress, 'someAddressForDelivery');
        assert.isFalse(result.shippingState[0].pickupEnabled, false);
    });
});

