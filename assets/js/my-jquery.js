jQuery(document).ready(function($) {
    $('.wp-block-create-block-axis-folio').each(function() {
        var $wrapper = $(this);
        var $grid = $wrapper.find('.portfolio-grid');

        // Initialize Masonry on visible items only
        $grid.imagesLoaded(function() {
            $grid.masonry({
                itemSelector: '.portfolio-item:not(.is-hidden)', // Only layout visible items initially
                columnWidth: '.grid-sizer',
                gutter: '.gutter-sizer',
                percentPosition: true,
                transitionDuration: '0.4s'
            });
        });

        // Load More Logic
        $wrapper.on('click', '.portfolio-load-more-btn', function(e) {
            e.preventDefault();
            var $btn = $(this);
            var perPage = parseInt($btn.data('perpage'));
            
            // Find the hidden items
            var $hiddenItems = $wrapper.find('.portfolio-item.is-hidden');
            
            // Take the next batch
            var $nextBatch = $hiddenItems.slice(0, perPage);

            if ($nextBatch.length > 0) {
                // Remove hidden class and show them
                $nextBatch.removeClass('is-hidden').show();

                // Tell Masonry to include these new items
                $grid.imagesLoaded(function() {
                    $grid.masonry('appended', $nextBatch);
                    $grid.masonry('layout');
                });
            }

            // If no more hidden items, hide the button
            if ($wrapper.find('.portfolio-item.is-hidden').length === 0) {
                $btn.parent().fadeOut();
            }
        });
    });
});