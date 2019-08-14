Feature: Land Home Page for page designer
    As a shopper, I want to land on the pd home Page

@homePagePD
    Scenario: Shopper is able to land on the pd home Page
        When shopper selects yes or no for tracking consent in PD
        Then shopper should see popular categories layout
        And shopper can click on a popular category
