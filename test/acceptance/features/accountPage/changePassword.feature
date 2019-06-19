Feature: Edit profile of a User Account
    As a shopper with an account, I want to be able to change my password

@accountPage
    Scenario: Shopper is able to change their password
        When shopper selects yes or no for tracking consent
        Given shopper goes to the Login Page
        Then shopper is able to fill out the email and password
        And shopper is able to click the login button
        And shopper is able to view profile dashboard
        And shopper clicks edit password
        And shopper changes their password