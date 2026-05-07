(function($) {
    'use strict';

    $(window).on('load', function() {
        $('.portfolio-grid').each(function() {
            var $grid = $(this);
            
            // Wait for images to load before positioning
            $grid.imagesLoaded(function() {
                $grid.masonry({
                    itemSelector: '.portfolio-item',
                    columnWidth: '.grid-sizer',
                    gutter: '.gutter-sizer',
                    percentPosition: true,
                    transitionDuration: '0.4s'
                });
            });
        });
    });

})(jQuery);