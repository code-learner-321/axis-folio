<?php
$items = $attributes['items'] ?? [];
$unique_id = $attributes['uniqueId'] ?? 'af-' . wp_generate_password( 4, false );
$enable_load_more = $attributes['enableLoadMore'] ?? false;
$posts_per_page   = $attributes['postsPerPage'] ?? 6;
$load_more_text   = $attributes['loadMoreText'] ?? 'Load More';

$wrapper_attributes = get_block_wrapper_attributes( [ 'id' => $unique_id ] );
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="portfolio-grid">
        <div class="grid-sizer"></div>
        <div class="gutter-sizer"></div>

        <?php foreach ( $items as $index => $item ) : 
            $is_hidden = ($enable_load_more && $index >= $posts_per_page);
            $item_class = 'portfolio-item' . ($is_hidden ? ' is-hidden' : '');
            $item_style = $is_hidden ? 'display: none;' : 'display: block;';
            ?>
            <div class="<?php echo esc_attr($item_class); ?>" style="<?php echo esc_attr($item_style); ?>">
                <?php if ( ! empty( $item['url'] ) ) : ?>
                    <div class="portfolio-image">
                        <img src="<?php echo esc_url( $item['url'] ); ?>" alt="" />
                    </div>
                <?php endif; ?>
                
                <div class="portfolio-content" style="padding: 20px;">
                    <h3 style="color: <?php echo esc_attr($attributes['titleColor']); ?>; font-size: <?php echo esc_attr($attributes['titleFontSize']); ?>px;">
                        <?php echo esc_html( $item['title'] ?? '' ); ?>
                    </h3>
                    <p style="color: <?php echo esc_attr($attributes['descColor']); ?>; font-size: <?php echo esc_attr($attributes['descFontSize']); ?>px;">
                        <?php echo esc_html( $item['description'] ?? '' ); ?>
                    </p>

                    <?php if ( !empty($item['tags']) ) : 
                        $tags = explode(',', $item['tags']); ?>
                        <div class="portfolio-tags">
                            <?php foreach($tags as $tag): ?>
                                <span class="tag" style="background:<?php echo esc_attr($attributes['tagBgColor']); ?>; color:<?php echo esc_attr($attributes['tagTextColor']); ?>; font-size:<?php echo esc_attr($attributes['tagFontSize']); ?>px;">
                                    <?php echo esc_html(trim($tag)); ?>
                                </span>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <?php if ( $enable_load_more && count( $items ) > $posts_per_page ) : ?>
        <div class="portfolio-load-more-wrapper" style="text-align: center; margin-top: 30px;">
            <button class="portfolio-load-more-btn" data-perpage="<?php echo esc_attr( $posts_per_page ); ?>">
                <?php echo esc_html( $load_more_text ); ?>
            </button>
        </div>
    <?php endif; ?>
</div>