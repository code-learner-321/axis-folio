(function($) {
    "use strict";

    var AxisFolioHandler = function($scope, $) {
        var $container = $scope.find('.axis-masonry-container');
        var grid = $container[0];
        var limit = parseInt($container.data('limit')) || 4;
        var $items = $scope.find('.axis-ms-item');
        var $loadMoreBtn = $scope.find('.axis-btn-load-more');
        var shown = limit;

        var resizeGridItem = function(item) {
            var rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
            var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')) || 20;
            var contentHeight = $(item).find('.axis-ms-card').outerHeight();
            var rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
            item.style.gridRowEnd = "span " + rowSpan;
        };

        var resizeAll = function() {
            $scope.find('.axis-ms-item.is-visible').each(function() {
                resizeGridItem(this);
            });
        };

        // Run on load and images load
        $(window).on('load resize', resizeAll);
        $scope.find('img').on('load', resizeAll);
        
        // Initial trigger
        setTimeout(resizeAll, 500);

        // Load More Logic
        $loadMoreBtn.on('click', function(e) {
            e.preventDefault();
            var $hidden = $scope.find('.axis-ms-item:not(.is-visible)');
            var $toShow = $hidden.slice(0, limit);
            
            // Fix overlapping: Add class first, but keep invisible via CSS 
            // then calculate layout, then fade in.
            $toShow.css({
                'opacity': 0,
                'display': 'block'
            }).addClass('is-visible');

            // Recalculate grid positions while items are invisible but in DOM
            resizeAll();

            // Now animate them in
            $toShow.animate({ 'opacity': 1 }, 400);

            shown += limit;
            if (shown >= $items.length) {
                $loadMoreBtn.parent().fadeOut();
            }
        });
    };

    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/axis-folio-widget.default', AxisFolioHandler);
    });

})(jQuery);