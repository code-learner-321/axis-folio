jQuery(document).ready(function($) {
    var $grid = $('.portfolio-grid');

    // imagesLoaded is essential because the tags/description 
    // change the height of the card.
    $grid.imagesLoaded(function() {
        $grid.masonry({
            itemSelector: '.portfolio-item',
            columnWidth: '.portfolio-item',
            percentPosition: true,
            gutter: 20,
            transitionDuration: '0.4s'
        });
    });

    // Re-layout on window resize to keep it responsive
    $(window).on('resize', function() {
        $grid.masonry('layout');
    });
});