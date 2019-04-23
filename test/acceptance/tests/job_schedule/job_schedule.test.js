import {expect} from 'chai';

Feature('Job Schedule').config('WebDriver', { browser: 'firefox' });

Before((I) => {
    I.amOnPage('/');
});

Scenario('Fred is able to schedule a Job', async (I) => {
    // just an example of test and other Codecept Features
    
    // can use external assertio libraries or in-built Codecept assertions
    expect('echo').to.be.equal('echos', 'search string did not equal');

}).tag('@job').retry(2);
    