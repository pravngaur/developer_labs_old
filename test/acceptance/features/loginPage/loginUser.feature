Feature: User Login
    As a shopper, I want to be able to log into the site

@login
    Scenario: Shopper is able to log into the site from the home page
        Given shopper goes to the Login Page
        Then shopper is able to fill out the email and password
        And shopper is able to click the login button
        And shopper is able to view profile dashboard