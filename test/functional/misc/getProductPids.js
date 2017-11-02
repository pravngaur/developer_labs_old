'use strict';

import { assert } from 'chai';
import * as testDataMgr from '../../mocks/testDataMgr/main';
import * as products from '../../mocks/testDataMgr/products';

describe('Get all the product ids from the site catalog', () => {
    let catalog;
    let pids = [];
    return testDataMgr.load()
        .then(() => {
            catalog = testDataMgr.parsedData.catalog;
            pids = products.getAllProductIds(catalog);
            console.log('products are ', pids.toString());
            return pids;
        })
})
