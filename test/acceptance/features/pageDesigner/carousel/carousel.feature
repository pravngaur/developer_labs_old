Feature: Page Designer Carousel
  As a shopper, I want to see the page designer carousel

  @Carousel @pageDesigner
  Scenario: Shopper is able to interact with the page designer carousel component
    When shopper load Page Designer home page
    Then shopper accept the Consent Tracking Modal
    And Shopper sees the main banner carousel
    Given Shopper sees carousel controls
    When Shopper clicks next
    Then Shopper should see next slide
    When Shopper clicks previous
    Then Shopper should see previous slide
  
  @Carousel @pageDesigner
  Scenario: Shopper is able to interact with the page designer carousel-2 component
    When shopper load Page Designer home page
    Then shopper accept the Consent Tracking Modal
    And Shopper sees the main banner carousel-2
    Given Shopper sees carousel-2 controls
    When Shopper clicks next on carousel-2
    Then Shopper should see next product on carousel-2
    When Shopper clicks previous on carousel-2
    Then Shopper should see previous slide on carousel-2
