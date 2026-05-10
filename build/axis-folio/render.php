<?php
/**
 * Render template for Axis Folio
 */

$items = $attributes['items'] ?? [];
$show_tags = $attributes['showTags'] ?? true;

// Dynamic Typography & Colors
$title_color    = $attributes['titleColor'] ?? '#111';
$title_size     = $attributes['titleFontSize'] ?? 20;
$desc_color     = $attributes['descColor'] ?? '#666';
$desc_size      = $attributes['descFontSize'] ?? 16;
$tag_bg_color   = $attributes['tagBgColor'] ?? '#f0f0f0';
$tag_text_color = $attributes['tagTextColor'] ?? '#555';
$tag_size       = $attributes['tagFontSize'] ?? 11;

$wrapper_attributes = get_block_wrapper_attributes( [ 'id' => $id ] );
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="portfolio-grid">
        <div class="grid-sizer"></div>
        <div class="gutter-sizer"></div>

        <?php if ( ! empty( $items ) ) : ?>
            <?php foreach ( $items as $item ) : ?>
                <div class="portfolio-item">
                    <?php if ( ! empty( $item['url'] ) ) : ?>
                        <div class="portfolio-image">
                            <img src="<?php echo esc_url( $item['url'] ); ?>" alt="" />
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

                        <?php if ( $show_tags && ! empty( $item['tags'] ) ) : 
                            $tags = explode( ',', $item['tags'] ); ?>
                            <div class="portfolio-tags">
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
</div>