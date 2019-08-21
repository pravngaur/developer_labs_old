Feature: Page Designer Carousel
  As a shopper, I want to see the page designer carousel

  @pdCarousel
  Scenario: Shopper is able to interact with the page designer carousel component
    When Shopper goes to the page designer homepage
    And Shopper sees the main banner carousel
    Given Shopper sees carousel controls
    When Shopper clicks next
    Then Shopper should see next slide
    When Shopper clicks previous
    Then Shopper should see previous slide
  
  @pdCarousel-2
  Scenario: Shopper is able to interact with the page designer carousel-2 component
    When Shopper goes to the page designer homepage carousel-2
    And Shopper sees the main banner carousel-2
    Given Shopper sees carousel-2 controls
    When Shopper clicks next on carousel-2
    Then Shopper should see next product on carousel-2
    When Shopper clicks previous on carousel-2
    Then Shopper should see previous slide on carousel-2
