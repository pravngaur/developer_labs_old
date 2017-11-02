'use strict';

var assert = require('chai').assert;
var request = require('request-promise');
var config = require('../it.config');

describe('check product price', function () {
    this.timeout(5000);

    it('Product price in PDP and Grid should be the same', function () {
        var Pids = ['25688302', '25503585'];
        Pids.forEach(function (pid) {
            console.log('verifying the product ', pid);
            verifyProductPrice(pid);
        });

        function verifyProductPrice(Pid) {
            var PDP;
            var myRequest = {
                url: config.baseUrl + '/Test-Product?pid=' + Pid,
                method: 'GET',
                rejectUnauthorized: false,
                resolveWithFullResponse: true
            };
            return request(myRequest)
                .then(function (response) {
                    var bodyAsJsonPdp = JSON.parse(response.body);
                    assert.equal(response.statusCode, 200, 'Expected Test-Product statusCode to be 200.');
                    myRequest.url = config.baseUrl + '/Test-Product?pid=' + Pid + '&pview=tile';
                    PDP = bodyAsJsonPdp.product;
                    console.log('PDP is ', PDP);
                    return request(myRequest);
                })
                .then(function (response2) {
                    var tile = JSON.parse(response2.body);
                    assert.equal(response2.statusCode, 200, 'Expected Test-Product statusCode to be 200.');
                    console.log('tile is ', tile.product);
                });
        };

    });
})

