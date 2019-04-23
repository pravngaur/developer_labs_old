
const Helper = codeceptjs.helper;

class SauceLabsHelper extends Helper {
  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']
  
  updateJob() {
    // access current client of WebDriver helper
    // let client = this.helpers['WebDriver'].browser;
    // console.log('Update Saucelabs Job here with  unique Session ID: ', client.sessionId);
    console.log('\n===== CUSTOM HELPERS TEST ======');
    console.log('SauceLabsHelper: Update Saucelabs Job here');
    console.log('===== ===== ======\n');
  }
}

module.exports = SauceLabsHelper;
