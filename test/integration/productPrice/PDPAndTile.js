'use strict';

var assert = require('chai').assert;
var request = require('request-promise');
var config = require('../it.config');

describe('check product price', function () {
    this.timeout(5000);

    it('Product price in PDP and Grid should be the same', function () {
        var Pids = '25688302';
        // Pids.forEach(function (pid) {
        //     console.log('verifying the product ', pid);
        //     verifyProductPrice(pid);
        // });
        //
        var PDP;
        var tile;
        var myRequest = {
            url: config.baseUrl + '/Test-Product?pid=' + Pids,
            method: 'GET',
            rejectUnauthorized: false,
            resolveWithFullResponse: true
        };
        return request(myRequest)
            .then(function (response) {
                var bodyAsJsonPdp = JSON.parse(response.body);
                assert.equal(response.statusCode, 200, 'Expected Test-Product statusCode to be 200.');
                myRequest.url = config.baseUrl + '/Test-Product?pid=' + Pids + '&pview=tile';
                PDP = bodyAsJsonPdp.product.price;
                console.log('PDP price is ', PDP);
                return request(myRequest);
            })
            .then(function (response2) {
                var bodyAsJsonTile = JSON.parse(response2.body);
                assert.equal(response2.statusCode, 200, 'Expected Test-Product statusCode to be 200.');
                tile = bodyAsJsonTile.product.price;
                console.log('Tile price is ', tile);
            })
            .then(() => assert.deepEqual(PDP, tile));
    });
});

