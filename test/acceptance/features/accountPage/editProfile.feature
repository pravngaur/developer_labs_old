Feature: Email signup
    As a shopper, I want to signup to mailing list

@homePage
    Scenario: Shopper is able to enter email for signup
        Given shopper goes to the Login Page
        Then shopper is able to fill out the email and password
        And shopper is able to click the login button
        And shopper is able to view profile dashboard
        