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

        $(window).on('load resize', resizeAll);
        $scope.find('img').on('load', resizeAll);
        
        setTimeout(resizeAll, 500);

        $loadMoreBtn.on('click', function(e) {
            e.preventDefault();
            var $hidden = $scope.find('.axis-ms-item:not(.is-visible)');
            var $toShow = $hidden.slice(0, limit);
            
            $toShow.css({
                'opacity': 0,
                'display': 'block'
            }).addClass('is-visible');

            resizeAll();

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