Feature: Add Address to User Account
    As a shopper with an account, I want to be able to add a saved address

@accountPage
    Scenario: Shopper is able to add an address to their account
        Given shopper goes to the Login Page
        Then shopper is able to fill out the email and password
        And shopper is able to click the login button
        And shopper is able to view profile dashboard
        And shopper clicks add new address
        And shopper fills out address information