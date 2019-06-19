Feature: Add Payment to User Account
    As a shopper with an account, I want to be able to add a saved payment

@accountPage
    Scenario: Shopper is able to add a payment to their account
        When shopper selects yes or no for tracking consent
        Given shopper goes to the Login Page
        Then shopper is able to fill out the email and password
        And shopper is able to click the login button
        And shopper is able to view profile dashboard
        And shopper clicks add new payment
        And shopper fills out payment information