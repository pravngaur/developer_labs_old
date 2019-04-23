import {expect} from 'chai';

Feature('Job Schedule').config('WebDriver', { browser: 'firefox' });

Before((I) => {
    I.amOnPage('/');
});

Scenario('Fred is able to schedule a Job', async (I) => {
    const searchString = 'echo';
    expect(searchString).to.be.equal('echos', 'search string did not equal');

}).tag('@job').retry(2);
    