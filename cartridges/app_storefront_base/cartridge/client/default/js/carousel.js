'use strict';

$(document).ready(function () {
    $('.experience-storefront-carousel .carousel').on('touchstart', function (touchStartEvent) {
        var xClick = touchStartEvent.originalEvent.touches[0].pageX;
        $(this).one('touchmove', function (touchMoveEvent) {
            var xMove = touchMoveEvent.originalEvent.touches[0].pageX;
            if (Math.floor(xClick - xMove) > 5) {
                $(this).carousel('next');
            } else if (Math.floor(xClick - xMove) < -5) {
                $(this).carousel('prev');
            }
        });
        $('.experience-storefront-carousel .carousel').on('touchend', function () {
            $(this).off('touchmove');
        });
    });

    $('.experience-storefront-carousel .carousel').on('slide.bs.carousel', function (e) {
        var activeCarouselPosition = $(e.relatedTarget).data('position');
        $(this).find('.pd-carousel-indicators .active').removeClass('active');
        $(this).find(".pd-carousel-indicators [data-position='" + activeCarouselPosition + "']").addClass('active');

        var extraSmallDisplay = $(this).data('xs');
        var smallDisplay = $(this).data('sm');
        var mediumDisplay = $(this).data('md');

        var elementIndex = $(e.relatedTarget).index();
        var itemsToDisplay = Math.max(extraSmallDisplay, smallDisplay, mediumDisplay);
        var numberOfSlides = $('.carousel-item', this).length;

        if (elementIndex >= numberOfSlides - (itemsToDisplay - 1)) {
            var it = itemsToDisplay - (numberOfSlides - elementIndex);
            for (var i = 0; i < it; i++) {
                // append slides to end
                if (e.direction === 'left') {
                    $('.carousel-item').eq(i).appendTo('.carousel-inner', this);
                } else {
                    $('.carousel-item').eq(0).appendTo('.carousel-inner', this);
                }
            }
        }
    });
});
