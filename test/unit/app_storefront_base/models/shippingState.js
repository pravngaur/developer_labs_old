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

var orderMock3 = {
    shipping: orderMock2.shipping.concat(orderMock.shipping)
};

describe('shippingState', function () {
    it('should return an address for pickup in store', function () {
        var result = new ShippingStateModel(orderMock);
        assert.equal(result.shippingState.shipments[0].shipmentUUID, '123');
        assert.equal(result.shippingState.shipments[0].methodID, '009');
        assert.equal(result.shippingState.shipments[0].pickupAddress, 'someStoreForPickUp');
        assert.isTrue(result.shippingState.shipments[0].pickupEnabled, true);
    });


    it('should return an address for delivery', function () {
        var result = new ShippingStateModel(orderMock2);
        assert.equal(result.shippingState.shipments[0].shipmentUUID, '345');
        assert.equal(result.shippingState.shipments[0].methodID, '008');
        assert.equal(result.shippingState.shipments[0].deliveryAddress, 'someAddressForDelivery');
        assert.isFalse(result.shippingState.shipments[0].pickupEnabled, false);
    });

    it('should return multiship as true for more than one shipment', function () {
        var result = new ShippingStateModel(orderMock3);
        assert.equal(result.shippingState.multiship, true);
    });

    it('should return multiship as false for only one shipment', function () {
        var result = new ShippingStateModel(orderMock);
        assert.equal(result.shippingState.multiship, false);
    });
});

