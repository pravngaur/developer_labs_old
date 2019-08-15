Feature: User Login
    As a shopper, I want to be able to log into the site

@loginUser
    Scenario: Shopper is able to log into the site from the home page
        Given shopper logs into the website

@loginUser @mobile
    Scenario: Shopper is able to log into the site mobile
        Given shopper logs into the website on phone

@loginUser @tablet
    Scenario: Shopper is able to log into the site tablet
        Given shopper logs into the website on tablet