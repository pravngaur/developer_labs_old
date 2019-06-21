Feature: Edit profile of a User Account
    As a shopper with an account, I want to be able to edit my profile

@accountPage
    Scenario: Shopper is able to edit their account
        Given shopper goes to the Login Page
        Then shopper is able to fill out the email and password
        And shopper is able to click the login button
        And shopper is able to view profile dashboard
        And shopper clicks edit profile
        And shopper edits phone number