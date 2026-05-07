<?php
/**
 * Render template for Axis Folio
 */

$items = $attributes['items'] ?? [];
$show_tags = $attributes['showTags'] ?? true;
$tag_bg_color   = $attributes['tagBgColor'] ?? '#f0f0f0';
$tag_text_color = $attributes['tagTextColor'] ?? '#555';

$wrapper_attributes = get_block_wrapper_attributes( [ 'id' => $id ] );
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="portfolio-grid">
        <?php if ( ! empty( $items ) ) : ?>
            <?php foreach ( $items as $item ) : ?>
                <div class="portfolio-item">
                    <?php if ( ! empty( $item['url'] ) ) : ?>
                        <div class="portfolio-image">
                            <img src="<?php echo esc_url( $item['url'] ); ?>" 
                                 alt="<?php echo esc_attr( $item['title'] ?? '' ); ?>" />
                        </div>
                    <?php endif; ?>
                    
                    <div class="portfolio-content" style="padding: 20px;">
                        <h3 style="margin: 0 0 8px 0; font-size: 1.25rem; font-weight: 700; line-height: 1.2;">
                            <?php echo esc_html( $item['title'] ?? '' ); ?>
                        </h3>

                        <p style="margin: 0 0 15px 0; font-size: 1rem; color: #666; line-height: 1.6;">
                            <?php echo esc_html( $item['description'] ?? '' ); ?>
                        </p>

                        <?php if ( $show_tags && ! empty( $item['tags'] ) ) : 
                            $tags = explode( ',', $item['tags'] ); ?>
                            <div class="portfolio-tags" style="display: flex; flex-wrap: wrap; gap: 6px; border-top: 1px solid #eee; padding-top: 12px;">
                                <?php foreach ( $tags as $tag ) : ?>
                                    <span class="tag" style="font-size: 11px; padding: 3px 10px; border-radius: 4px; font-weight: 600; text-transform: uppercase; 
                                        background-color: <?php echo esc_attr( $tag_bg_color ); ?>; 
                                        color: <?php echo esc_attr( $tag_text_color ); ?>;">
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