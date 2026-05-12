<?php
/**
 * Render template for Axis Folio
 */

$items = $attributes['items'] ?? [];
$unique_id = $attributes['uniqueId'] ?? 'af-' . wp_generate_password( 4, false );
$show_tags = $attributes['showTags'] ?? true;

// Divider Logic
$show_divider  = $attributes['showTagDivider'] ?? false;
$divider_w     = $attributes['dividerWidth'] ?? 100;
$divider_h     = $attributes['dividerHeight'] ?? 1;
$divider_color = $attributes['dividerColor'] ?? '#eeeeee';

// Pagination Attributes
$enable_load_more = $attributes['enableLoadMore'] ?? false;
$posts_per_page   = $attributes['postsPerPage'] ?? 3;
$load_more_text   = $attributes['loadMoreText'] ?? 'Load More';

// Style Attributes
$card_radius      = $attributes['borderRadius'] ?? 8;
$btn_radius       = $attributes['btnBorderRadius'] ?? 4;

// Dynamic Typography & Colors
$title_color    = $attributes['titleColor'] ?? '#111';
$title_size     = $attributes['titleFontSize'] ?? 20;
$desc_color     = $attributes['descColor'] ?? '#666';
$desc_size      = $attributes['descFontSize'] ?? 16;
$tag_bg_color   = $attributes['tagBgColor'] ?? '#f0f0f0';
$tag_text_color = $attributes['tagTextColor'] ?? '#555';
$tag_size       = $attributes['tagFontSize'] ?? 11;

$wrapper_attributes = get_block_wrapper_attributes( [ 'id' => $unique_id ] );
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="portfolio-grid">
        <div class="grid-sizer"></div>
        <div class="gutter-sizer"></div>

        <?php if ( ! empty( $items ) ) : ?>
            <?php foreach ( $items as $index => $item ) : 
                $is_hidden = ($enable_load_more && $index >= $posts_per_page);
                $item_class = 'portfolio-item' . ($is_hidden ? ' is-hidden' : '');
                $item_style = ($is_hidden ? 'display: none;' : 'display: block;') . " border-radius: {$card_radius}px;";
                ?>
                <div class="<?php echo esc_attr($item_class); ?>" style="<?php echo esc_attr($item_style); ?>">
                    <?php if ( ! empty( $item['url'] ) ) : ?>
                        <div class="portfolio-image">
                            <img src="<?php echo esc_url( $item['url'] ); ?>" alt="<?php echo esc_attr( $item['title'] ?? '' ); ?>" />
                        </div>
                    <?php endif; ?>
                    
                    <div class="portfolio-content" style="padding: 20px;">
                        <h3 style="margin: 0 0 8px 0; line-height: 1.2; font-weight: 700; 
                            color: <?php echo esc_attr( $title_color ); ?>; 
                            font-size: <?php echo esc_attr( $title_size ); ?>px;">
                            <?php echo esc_html( $item['title'] ?? '' ); ?>
                        </h3>

                        <p style="margin: 0 0 15px 0; line-height: 1.6; 
                            color: <?php echo esc_attr( $desc_color ); ?>; 
                            font-size: <?php echo esc_attr( $desc_size ); ?>px;">
                            <?php echo esc_html( $item['description'] ?? '' ); ?>
                        </p>

                        <?php if ( $show_divider ) : ?>
                            <div class="tag-divider" style="width: <?php echo esc_attr($divider_w); ?>%; height: <?php echo esc_attr($divider_h); ?>px; background-color: <?php echo esc_attr($divider_color); ?>; margin: 15px 0;"></div>
                        <?php endif; ?>

                        <?php if ( $show_tags && ! empty( $item['tags'] ) ) : 
                            $tags = explode( ',', $item['tags'] ); ?>
                            <div class="portfolio-tags" style="display: flex; flex-wrap: wrap; gap: 6px;">
                                <?php foreach ( $tags as $tag ) : ?>
                                    <span class="tag" style="padding: 3px 10px; border-radius: 4px; font-weight: 600; text-transform: uppercase; 
                                        background-color: <?php echo esc_attr( $tag_bg_color ); ?>; 
                                        color: <?php echo esc_attr( $tag_text_color ); ?>;
                                        font-size: <?php echo esc_attr( $tag_size ); ?>px;">
                                        <?php echo esc_html( trim( $tag ) ) ; ?>
                                    </span>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>

    <?php if ( $enable_load_more && count( $items ) > $posts_per_page ) : ?>
        <div class="portfolio-load-more-wrapper" style="text-align: center; margin-top: 40px; clear: both;">
            <button class="portfolio-load-more-btn" 
                    data-perpage="<?php echo esc_attr( $posts_per_page ); ?>"
                    style="padding: 12px 30px; border: none; cursor: pointer; font-weight: 600; 
                    border-radius: <?php echo esc_attr( $btn_radius ); ?>px;">
                <?php echo esc_html( $load_more_text ); ?>
            </button>
        </div>
    <?php endif; ?>
</div>