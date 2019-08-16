Feature: Edit profile of a User Account
    As a shopper with an account, I want to be able to edit my profile

    Background:
        Given shopper logs into the website

@accountPage
    Scenario: Shopper is able to edit their account information
        Then shopper clicks edit profile
        And shopper edits phone number

@accountPage @editprofile
    Scenario: Shopper is able to edit a saved address
        Then shopper views address book
        And shopper edits address
        And shopper fills out address information
