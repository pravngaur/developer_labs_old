Feature: Edit profile of a User Account
    As a shopper with an account, I want to be able to edit my profile

    Background:
        Given shopper logs into the website
        And shopper clicks edit profile

@accountPage
    Scenario: Shopper is able to edit their account information
        And shopper edits phone number

@accountPage
    Scenario: Shopper is able to edit a saved address
        And shopper edits address
        And shopper fills out address information