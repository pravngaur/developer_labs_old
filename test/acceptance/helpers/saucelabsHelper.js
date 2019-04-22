
const Helper = codeceptjs.helper;

class SauceLabsHelper extends Helper {
  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']
  async updateJob() {
    // access current client of WebDriver helper
    let client = this.helpers['WebDriver'].browser;
    console.log('Update Saucelabs Job here with  unique Session ID: ', client.sessionId);
  }
}

module.exports = SauceLabsHelper;
