'use strict';

var assert = require('chai').assert;
var sinon = require('sinon');

var search = require('../../../../../app_storefront_base/cartridge/scripts/search/search');


describe('search script', function () {
    describe('addRefinementValues', function () {
        var mockProductSearch = {
            addRefinementValues: function () {}
        };
        var spyAddRefinementValues = sinon.spy(mockProductSearch, 'addRefinementValues');
        var mockPreferences = {
            prefn1: 'pref1Value',
            prefn2: 'pref2Value'
        };

        search.addRefinementValues(mockProductSearch, mockPreferences);

        it('should set selected refinement values', function () {
            assert.isTrue(spyAddRefinementValues.calledWith('prefn1', 'pref1Value'));
            assert.isTrue(spyAddRefinementValues.calledWith('prefn2', 'pref2Value'));
        });
    });

    describe('parseParams', function () {
        var mockParams = {
            key1: 'value1',
            key2: 'value2',
            prefn1: 'pref1',
            prefv1: 'pref1Value',
            prefn2: 'pref2',
            prefv2: 'pref2Value'
        };

        var result = search.parseParams(mockParams);

        it('should parse simple key values', function () {
            assert.equal(result.key1, mockParams.key1);
            assert.equal(result.key2, mockParams.key2);
        });

        it('should parse complex preference values', function () {
            assert.deepEqual(result.preferences, {
                pref1: 'pref1Value',
                pref2: 'pref2Value'
            });
        });
    });

    describe('setProductProperties', function () {
        var mockProductSearch = {
            setSearchPhrase: function () {},
            setCategoryID: function () {},
            setProductID: function () {},
            setPriceMin: function () {},
            setPriceMax: function () {},
            setSortingRule: function () {},
            setRecursiveCategorySearch: function () {}
        };
        var mockParams = {
            q: 'toasters',
            cgid: { ID: 'abc' },
            pid: 'Product123',
            pmin: '15',
            pmax: '37'
        };
        var mockSelectedCategory = {
            ID: 123
        };
        var mockSortingRule = 'rule3';

        var spySetSearchPhrase = sinon.spy(mockProductSearch, 'setSearchPhrase');
        var spySetCategoryID = sinon.spy(mockProductSearch, 'setCategoryID');
        var spySetProductID = sinon.spy(mockProductSearch, 'setProductID');
        var spySetPriceMin = sinon.spy(mockProductSearch, 'setPriceMin');
        var spySetPriceMax = sinon.spy(mockProductSearch, 'setPriceMax');
        var spySetSortingRule = sinon.spy(mockProductSearch, 'setSortingRule');
        var spySetRecursiveCategorySearch = sinon.spy(mockProductSearch,
            'setRecursiveCategorySearch');

        search.setProductProperties(
            mockProductSearch,
            mockParams,
            mockSelectedCategory,
            mockSortingRule
        );

        function toNumber(str) {
            return parseInt(str, 10);
        }

        it('should set the search phrase', function () {
            assert.isTrue(spySetSearchPhrase.calledWith(mockParams.q));
        });

        it('should set the category ID', function () {
            assert.isTrue(spySetCategoryID.calledWith(mockSelectedCategory.ID));
        });

        it('should set the product ID', function () {
            assert.isTrue(spySetProductID.calledWith(mockParams.pid));
        });

        it('should set the minimum price', function () {
            assert.isTrue(spySetPriceMin.calledWith(toNumber(mockParams.pmin)));
        });

        it('should set the maximum price', function () {
            assert.isTrue(spySetPriceMax.calledWith(toNumber(mockParams.pmax)));
        });

        it('should set the sort rule', function () {
            assert.isTrue(spySetSortingRule.calledWith(mockSortingRule));
        });

        it('should set category search to be recursive', function () {
            assert.isTrue(spySetRecursiveCategorySearch.calledWith(true));
        });
    });
});