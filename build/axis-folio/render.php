<?php
/**
 * Render template for Axis Folio
 */

$items = $attributes['items'] ?? [];
$unique_id = $attributes['uniqueId'] ?? 'af-' . wp_generate_password( 4, false );
$show_tags = $attributes['showTags'] ?? true;
$show_divider  = $attributes['showTagDivider'] ?? false;
$divider_w     = $attributes['dividerWidth'] ?? 100;
$divider_h     = $attributes['dividerHeight'] ?? 1;
$divider_color = $attributes['dividerColor'] ?? '#eeeeee';
$enable_load_more = $attributes['enableLoadMore'] ?? false;
$posts_per_page   = $attributes['postsPerPage'] ?? 3;
$load_more_text   = $attributes['loadMoreText'] ?? 'Load More';
$card_radius      = $attributes['borderRadius'] ?? 8;
$btn_radius       = $attributes['btnBorderRadius'] ?? 4;
$title_color    = $attributes['titleColor'] ?? '#111111';
$title_size     = $attributes['titleFontSize'] ?? 20;
$title_padding  = $attributes['titlePadding'] ?? 0;
$title_padding_top     = $attributes['titlePaddingTop'] ?? null;
$title_padding_right   = $attributes['titlePaddingRight'] ?? null;
$title_padding_bottom  = $attributes['titlePaddingBottom'] ?? null;
$title_padding_left    = $attributes['titlePaddingLeft'] ?? null;
$desc_color     = $attributes['descColor'] ?? '#666666';
$desc_size      = $attributes['descFontSize'] ?? 16;
$desc_padding   = $attributes['descPadding'] ?? 0;
$desc_padding_top     = $attributes['descPaddingTop'] ?? null;
$desc_padding_right   = $attributes['descPaddingRight'] ?? null;
$desc_padding_bottom  = $attributes['descPaddingBottom'] ?? null;
$desc_padding_left    = $attributes['descPaddingLeft'] ?? null;
$tag_bg_color   = $attributes['tagBgColor'] ?? '#f0f0f0';
$tag_text_color = $attributes['tagTextColor'] ?? '#555555';
$tag_size       = $attributes['tagFontSize'] ?? 11;
$tag_padding    = $attributes['tagPadding'] ?? 0;
$tag_padding_top     = $attributes['tagPaddingTop'] ?? null;
$tag_padding_right   = $attributes['tagPaddingRight'] ?? null;
$tag_padding_bottom  = $attributes['tagPaddingBottom'] ?? null;
$tag_padding_left    = $attributes['tagPaddingLeft'] ?? null;

$card_bg_color   = $attributes['cardBgColor'] ?? '#ffffff';
$h_card_bg_color = $attributes['hCardBgColor'] ?? '#ffffff';

$title_font = $attributes['titleFontFamily'] ?? 'inherit';
$desc_font  = $attributes['descFontFamily'] ?? 'inherit';
$tag_font   = $attributes['tagFontFamily'] ?? 'inherit';

$has_zoom   = $attributes['hasZoom'] ?? true;
$zoom_scale = $attributes['zoomScale'] ?? 1.05;

// Advanced Variable Shadow Computations
$has_shadow = $attributes['hasShadow'] ?? true;
$s_x        = $attributes['shadowX'] ?? 0;
$s_y        = $attributes['shadowY'] ?? 4;
$s_b        = $attributes['shadowBlur'] ?? 12;
$s_s        = $attributes['shadowSpread'] ?? 0;
$s_c        = $attributes['shadowColor'] ?? 'rgba(0,0,0,0.1)';

$hs_x       = $attributes['hShadowX'] ?? 0;
$hs_y       = $attributes['hShadowY'] ?? 8;
$hs_b       = $attributes['hShadowBlur'] ?? 20;
$hs_s       = $attributes['hShadowSpread'] ?? 0;
$hs_c       = $attributes['hShadowColor'] ?? 'rgba(0,0,0,0.2)';

$shadow_css   = $has_shadow ? "box-shadow: {$s_x}px {$s_y}px {$s_b}px {$s_s}px {$s_c} !important;" : "box-shadow: none !important;";
$h_shadow_css = $has_shadow ? "box-shadow: {$hs_x}px {$hs_y}px {$hs_b}px {$hs_s}px {$hs_c} !important;" : "box-shadow: none !important;";
$zoom_css     = $has_zoom ? "transform: scale({$zoom_scale}) !important;" : "transform: scale(1) !important;";

$cols_d = $attributes['columnsDesktop'] ?? 3;
$cols_t = $attributes['columnsTablet'] ?? 2;
$cols_m = $attributes['columnsMobile'] ?? 1;
$grid_gap = $attributes['gridGap'] ?? 20;
$align = $attributes['align'] ?? '';
$wrapper_style = '';
if ( $align === 'wide' ) {
    $wrapper_style = 'max-width: var(--wp--style--global--content-size, 1200px); width: 100%; margin-left: auto; margin-right: auto;';
} elseif ( $align === 'full' ) {
    $wrapper_style = 'max-width: none; width: 100%; margin-left: 0; margin-right: 0;';
}
$wrapper_class = 'wp-block-create-block-axis-folio';
if ( $align ) {
    $wrapper_class .= ' align' . sanitize_html_class( $align );
}

// Dynamic instance styling breaks specificity lockouts introduced by static scss scripts
echo "<style>
    #{$unique_id} .portfolio-grid {
        display: grid !important;
        grid-template-columns: repeat({$cols_d}, minmax(0, 1fr)) !important;
        gap: {$grid_gap}px !important;
        width: 100% !important;
        position: relative !important;
    }
    #{$unique_id} .grid-sizer {
        width: calc( (100% / {$cols_d}) - ({$grid_gap}px * ({$cols_d} - 1) / {$cols_d}) ) !important;
    }
    #{$unique_id} .gutter-sizer {
        width: {$grid_gap}px !important;
    }
    #{$unique_id} .portfolio-item {
        display: block !important;
        width: 100% !important;
    }
    @media (max-width: 991px) {
        #{$unique_id} .portfolio-grid {
            grid-template-columns: repeat({$cols_t}, minmax(0, 1fr)) !important;
        }
    }
    @media (max-width: 767px) {
        #{$unique_id} .portfolio-grid {
            grid-template-columns: repeat({$cols_m}, minmax(0, 1fr)) !important;
        }
    }
    #{$unique_id} .portfolio-item {
        display: block !important;
        width: 100% !important;
        margin: 0 !important;
    }
    #{$unique_id} .portfolio-item-card {
        background: {$card_bg_color} !important;
        border-radius: {$card_radius}px !important;
        {$shadow_css}
        transition: all 0.3s ease-in-out !important;
        overflow: hidden !important;
        display: flex !important;
        flex-direction: column !important;
        height: 100% !important;
    }
    #{$unique_id} .portfolio-item-card:hover {
        background: {$h_card_bg_color} !important;
        {$h_shadow_css}
    }
    #{$unique_id} .portfolio-image {
        overflow: hidden !important;
        position: relative !important;
        width: 100% !important;
    }
    #{$unique_id} .portfolio-image img {
        transition: transform 0.3s ease-in-out !important;
        width: 100% !important;
        display: block !important;
        height: auto !important;
    }
    #{$unique_id} .portfolio-item-card:hover .portfolio-image img {
        {$zoom_css}
    }
</style>";

$wrapper_attributes = get_block_wrapper_attributes( [ 'id' => $unique_id, 'className' => $wrapper_class ] );
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="portfolio-grid" style="visibility: hidden; opacity: 0; transition: opacity 0.24s ease;">
        <div class="grid-sizer"></div>
        <div class="gutter-sizer"></div>
        <?php if ( ! empty( $items ) ) : ?>
            <?php foreach ( $items as $index => $item ) : 
                $is_hidden = ($enable_load_more && $index >= $posts_per_page);
                $item_class = 'portfolio-item' . ($is_hidden ? ' is-hidden' : '');
                $item_style = ($is_hidden ? 'display: none;' : 'display: block;');
                
                $link_url = !empty($item['linkUrl']) ? esc_url($item['linkUrl']) : '';
                $target = (!empty($item['openInNewTab']) && $item['openInNewTab'] === true) ? '_blank' : '_self';
                $rel = ($target === '_blank') ? 'rel="noopener noreferrer"' : '';

                $has_title = !empty($item['title']);
                $has_desc = !empty($item['description']);
                $tags_value = '';
                if ( isset( $item['tags'] ) ) {
                    $tags_value = is_string( $item['tags'] ) ? $item['tags'] : ( is_scalar( $item['tags'] ) ? strval( $item['tags'] ) : '' );
                }
                $has_tags = ( $show_tags && $tags_value !== '' );
                ?>
                <div class="<?php echo esc_attr($item_class); ?>" style="<?php echo esc_attr($item_style); ?>">
                    <div class="portfolio-item-card">
                        <?php if ( ! empty( $item['url'] ) ) : ?>
                            <div class="portfolio-image">
                                <?php if ($link_url) : ?><a href="<?php echo $link_url; ?>" target="<?php echo $target; ?>" <?php echo $rel; ?> style="display:block;"><?php endif; ?>
                                <img src="<?php echo esc_url( $item['url'] ); ?>" alt="<?php echo esc_attr( $item['title'] ?? '' ); ?>" />
                                <?php if ($link_url) : ?></a><?php endif; ?>
                            </div>
                        <?php endif; ?>
                        
                        <?php if ( $has_title || $has_desc || $has_tags ) : ?>
                        <div class="portfolio-content" style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column;">
                            <?php if ( $has_title ) : ?>
                                <h3 style="margin: 0 0 8px 0; line-height: 1.2; font-weight: 700; color: <?php echo esc_attr( $title_color ); ?>; font-size: <?php echo esc_attr( $title_size ); ?>px; font-family: <?php echo esc_attr($title_font); ?>; padding: <?php echo esc_attr( $title_padding_top ?? $title_padding ); ?>px <?php echo esc_attr( $title_padding_right ?? $title_padding ); ?>px <?php echo esc_attr( $title_padding_bottom ?? $title_padding ); ?>px <?php echo esc_attr( $title_padding_left ?? $title_padding ); ?>px;">
                                    <?php if ($link_url) : ?><a href="<?php echo $link_url; ?>" target="<?php echo $target; ?>" <?php echo $rel; ?> style="text-decoration: none; color: inherit;"><?php endif; ?>
                                    <?php echo esc_html( $item['title'] ); ?>
                                    <?php if ($link_url) : ?></a><?php endif; ?>
                                </h3>
                            <?php endif; ?>

                            <?php if ( $has_desc ) : ?>
                                <p style="margin: 0 0 15px 0; line-height: 1.6; color: <?php echo esc_attr( $desc_color ); ?>; font-size: <?php echo esc_attr( $desc_size ); ?>px; font-family: <?php echo esc_attr($desc_font); ?>; padding: <?php echo esc_attr( $desc_padding_top ?? $desc_padding ); ?>px <?php echo esc_attr( $desc_padding_right ?? $desc_padding ); ?>px <?php echo esc_attr( $desc_padding_bottom ?? $desc_padding ); ?>px <?php echo esc_attr( $desc_padding_left ?? $desc_padding ); ?>px;">
                                    <?php echo esc_html( $item['description'] ); ?>
                                </p>
                            <?php endif; ?>

                            <?php if ( $show_divider && $has_tags ) : ?>
                                <div class="tag-divider" style="width: <?php echo esc_attr($divider_w); ?>%; height: <?php echo esc_attr($divider_h); ?>px; background-color: <?php echo esc_attr($divider_color); ?>; margin: auto 0 15px 0;"></div>
                            <?php endif; ?>

                            <?php if ( $has_tags ) : 
                                $tags = $tags_value !== '' ? explode( ',', $tags_value ) : []; ?>
                                <div class="portfolio-tags" style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; padding: <?php echo esc_attr( $tag_padding_top ?? $tag_padding ); ?>px <?php echo esc_attr( $tag_padding_right ?? $tag_padding ); ?>px <?php echo esc_attr( $tag_padding_bottom ?? $tag_padding ); ?>px <?php echo esc_attr( $tag_padding_left ?? $tag_padding ); ?>px;">
                                    <?php foreach ( $tags as $tag ) : ?>
                                        <span class="tag" style="padding: 3px 10px; border-radius: 4px; font-weight: 600; text-transform: uppercase; background-color: <?php echo esc_attr( $tag_bg_color ); ?>; color: <?php echo esc_attr( $tag_text_color ); ?>; font-size: <?php echo esc_attr( $tag_size ); ?>px; font-family: <?php echo esc_attr($tag_font); ?>;">
                                            <?php echo esc_html( trim( $tag ) ) ; ?>
                                        </span>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>

    <?php if ( $enable_load_more && count( $items ) > $posts_per_page ) : ?>
        <div class="portfolio-load-more-wrapper" style="text-align: center; margin-top: 40px; clear: both; width: 100%;">
            <button class="portfolio-load-more-btn" data-perpage="<?php echo esc_attr( $posts_per_page ); ?>" style="padding: 12px 30px; border: none; cursor: pointer; font-weight: 600; border-radius: <?php echo esc_attr( $btn_radius ); ?>px; background-color: <?php echo esc_attr($attributes['btnBgColor'] ?? '#111111'); ?>; color: <?php echo esc_attr($attributes['btnTextColor'] ?? '#ffffff'); ?>;">
                <?php echo esc_html( $load_more_text ); ?>
            </button>
        </div>
    <?php endif; ?>
</div>