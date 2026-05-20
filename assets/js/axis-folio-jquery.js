jQuery(document).ready(function($) {
    $('.wp-block-create-block-axis-folio').each(function() {
        var $wrapper = $(this);
        var $grid = $wrapper.find('.portfolio-grid');

        // Initialize Masonry on visible items only (robust init + fallback)
        if ( $grid.find('.grid-sizer').length ) {
            var debugMode = window.AxisFolioDebug || false;
            var initMasonry = function() {
                if ( debugMode ) {
                    console.debug('Axis Folio: initMasonry called', $grid.get(0));
                }

                try {
                    $grid.imagesLoaded(function() {
                        $grid.masonry({
                            itemSelector: '.portfolio-item:not(.is-hidden)', // Only layout visible items initially
                            columnWidth: '.grid-sizer',
                            gutter: '.gutter-sizer',
                            percentPosition: true,
                            transitionDuration: '0.4s'
                        });

                        // Reveal the grid after layout to avoid initial size flash
                        $grid.imagesLoaded(function() {
                            $grid.masonry('layout');
                            $grid.css({ visibility: 'visible', opacity: 1 });
                        });

                        if ( debugMode ) {
                            console.debug('Axis Folio: Masonry initialized', $grid.data('masonry'));
                        }
                    });
                } catch (e) {
                    if ( debugMode ) {
                        console.debug('Axis Folio: Masonry init failed, deferring to window.load', e);
                    }

                    // imagesLoaded or Masonry might not be available yet; try again on window load
                    $(window).one('load', function() {
                        if ( typeof $grid.imagesLoaded === 'function' ) {
                            $grid.imagesLoaded(function() {
                                $grid.masonry({
                                    itemSelector: '.portfolio-item:not(.is-hidden)',
                                    columnWidth: '.grid-sizer',
                                    gutter: '.gutter-sizer',
                                    percentPosition: true,
                                    transitionDuration: '0.4s'
                                });

                                $grid.masonry('layout');
                                $grid.css({ visibility: 'visible', opacity: 1 });

                                if ( debugMode ) {
                                    console.debug('Axis Folio: Masonry initialized on load via imagesLoaded', $grid.data('masonry'));
                                }
                            });
                        } else if ( typeof $grid.masonry === 'function' ) {
                            $grid.masonry({
                                itemSelector: '.portfolio-item:not(.is-hidden)',
                                columnWidth: '.grid-sizer',
                                gutter: '.gutter-sizer',
                                percentPosition: true,
                                transitionDuration: '0.4s'
                            });

                            $grid.masonry('layout');
                            $grid.css({ visibility: 'visible', opacity: 1 });

                            if ( debugMode ) {
                                console.debug('Axis Folio: Masonry initialized on load directly', $grid.data('masonry'));
                            }
                        }
                    });
                }
            };

            initMasonry();

            // Ensure layout after window load as a safety-net (handles cached images)
            $(window).on('load', function() {
                if ( debugMode ) {
                    console.debug('Axis Folio: window.load layout check', $grid.data('masonry'));
                }

                if ( $grid.data('masonry') ) {
                    $grid.masonry('layout');
                } else {
                    // Try to initialize again if it wasn't initialized earlier
                    initMasonry();
                }
            });
        }

        // Load More Logic
        $wrapper.on('click', '.portfolio-load-more-btn', function(e) {
            e.preventDefault();
            var $btn = $(this);
            var perPage = parseInt($btn.data('perpage')) || 4;
            
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