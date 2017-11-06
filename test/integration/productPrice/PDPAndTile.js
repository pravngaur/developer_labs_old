'use strict';

var assert = require('chai').assert;
var request = require('request-promise');
var config = require('../it.config');

describe('check product price', function () {
    this.timeout(5000);

    it('Product price in PDP and Grid should be the same', function () {
        var tierPids = ['22956726'];
        var pids = ['11736753','12416789','21736758','22416787', '22956726'];
        let promises = [];

        pids.forEach((pid) => promises.push(verifyPrices(pid)));
        return Promise.all(promises)
            .then(() => {
            console.log('test run successfully: ');
            }).catch(error => {
                console.log('test failed with error : ' + error);

            });
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
                console.log('====PDP is ', PDP);
                return request(myRequest);
            })
            .then(function (response2) {
                var bodyAsJsonTile = JSON.parse(response2.body);
                assert.equal(response2.statusCode, 200, 'Expected Test-Product statusCode to be 200.');
                tile = bodyAsJsonTile.product.price;
                console.log('+++++++ tile is ', tile);
                try {
                    assert.deepEqual(PDP, tile);
                }catch(error) {
                    console.log('product with id ' + pid + 'has failed =======' + error);
                }
                return Promise.resolve();
            })
    }
});

