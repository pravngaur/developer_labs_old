import {expect} from 'chai';

Feature('Job Schedule').config('WebDriver', { browser: 'firefox' });

Before((I) => {
    I.amOnPage('/');
});

Scenario('Fred is able to schedule a Job', async (I, homePage) => {
    const searchString = 'echo';
    homePage.search(searchString);
    expect(searchString).to.be.equal('echo', 'search string did not equal');

}).tag('@job_schedule');
