'use strict';

var assert = require('chai').assert;
var request = require('request-promise');
var config = require('../it.config');

describe('check product price', function () {
    this.timeout(5000);

    it('Product price in PDP and Grid should be the same', function () {
        var pids = ['25688302', '25413129', '69309284'];
        let promises = [];

        pids.forEach((pid) => promises.push(verifyPrices(pid)));
        return Promise.all(promises)
            .then((results) => {
            console.log('test run ', results);
            }).catch(error => console.log(error));

    });

    function verifyPrices(pid) {
        var PDP;
        var tile;
        var myRequest = {
            url: config.baseUrl + '/Test-Product?pid=' + pid,
            method: 'GET',
            rejectUnauthorized: false,
            resolveWithFullResponse: true
        };
        return request(myRequest)
            .then(function (response) {
                var bodyAsJsonPdp = JSON.parse(response.body);
                assert.equal(response.statusCode, 200, 'Expected Test-Product statusCode to be 200.');
                myRequest.url = config.baseUrl + '/Test-Product?pid=' + pid + '&pview=tile';
                PDP = bodyAsJsonPdp.product.price;
                console.log('PDP price is ', PDP);
                return request(myRequest);
            })
            .then(function (response2) {
                var bodyAsJsonTile = JSON.parse(response2.body);
                assert.equal(response2.statusCode, 200, 'Expected Test-Product statusCode to be 200.');
                tile = bodyAsJsonTile.product.price;
                console.log('Tile price is ', tile);
                assert.deepEqual(PDP, tile);
                return Promise.resolve();
            })
    }
});

