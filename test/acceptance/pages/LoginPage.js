// const { I } = inject();
const I = actor();

module.exports = {

  // insert your locators and methods here
  // setting locators
  fields: {
    email: '[name="LoginForm_Login"]',
    password: '[name="LoginForm_Password"]'
  },
  // introducing methods
  login(email, password) {
    I.fillField(this.fields.email, email);
    I.fillField(this.fields.password, password);
    I.click('Log In');
  }
}
