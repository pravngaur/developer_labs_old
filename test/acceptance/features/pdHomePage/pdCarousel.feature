Feature: Page Designer Carousel
  As a shopper, I want to see the page designer carousel

  @pdCarousel
  Scenario: Shopper is able to interact with the page designer carousel component
    When shopper goes to the page designer homepage
    And Shopper sees the main banner carousel
    Given shopper sees carousel controls
    When shopper clicks next
    Then Shopper should see next product