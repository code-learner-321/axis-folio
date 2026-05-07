<?php
/**
 * Plugin Name:       Axis Folio
 * Description:       Native Masonry Portfolio Block with dynamic gaps and zoom.
 * Version:           2.0.0
 * Author:            Najubudeen
 */

if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'init', function() {
    register_block_type( __DIR__ . '/build/axis-folio', array(
        'render_callback' => 'axis_folio_render_handler',
    ) );
});

function axis_folio_render_handler( $attributes, $content ) {
    $id = ! empty( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : 'af-' . wp_generate_password( 4, false );
    
    $cols_d = $attributes['columnsDesktop'] ?? 3;
    $cols_t = $attributes['columnsTablet'] ?? 2;
    $cols_m = $attributes['columnsMobile'] ?? 1;
    $gap    = $attributes['gridGap'] ?? 20;
    $radius = $attributes['borderRadius'] ?? 8;
    $bg_col = $attributes['cardBgColor'] ?? '#ffffff';
    $shadow = $attributes['hasShadow'] ?? true;
    $sh_col = $attributes['shadowColor'] ?? 'rgba(0,0,0,0.1)';
    
    $has_zoom   = $attributes['hasZoom'] ?? true;
    $zoom_scale = $attributes['zoomScale'] ?? 1.15;
    $show_line  = $attributes['showTagLine'] ?? true;

    $final_shadow = $shadow ? "0 4px 12px {$sh_col}" : "none";
    $border_top   = $show_line ? "1px solid #eee" : "none";

    $css = "
        #{$id} { display: block !important; width: 100% !important; margin: 40px auto !important; }
        #{$id} .portfolio-grid { position: relative; width: 100% !important; }
        
        /* Width Calculation including Gap */
        #{$id} .portfolio-item, #{$id} .grid-sizer {
            width: calc( (100% / {$cols_d}) - ({$gap}px * ({$cols_d} - 1) / {$cols_d}) ) !important;
        }

        #{$id} .gutter-sizer { width: {$gap}px !important; }

        #{$id} .portfolio-item {
            margin-bottom: {$gap}px !important;
            background: {$bg_col} !important;
            border-radius: {$radius}px !important;
            box-shadow: {$final_shadow} !important;
            overflow: hidden !important;
        }

        #{$id} .portfolio-image { overflow: hidden !important; line-height: 0; }
        #{$id} .portfolio-image img {
            transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            display: block; width: 100%; height: auto;
        }

        #{$id} .portfolio-tags { 
            display: flex; flex-wrap: wrap; gap: 6px; 
            border-top: {$border_top} !important; 
            padding-top: 12px; 
        }

        @media (max-width: 1024px) {
            #{$id} .portfolio-item, #{$id} .grid-sizer { 
                width: calc( (100% / {$cols_t}) - ({$gap}px * ({$cols_t} - 1) / {$cols_t}) ) !important; 
            }
        }
        @media (max-width: 600px) {
            #{$id} .portfolio-item, #{$id} .grid-sizer { width: 100% !important; }
            #{$id} .gutter-sizer { width: 0px !important; }
        }
    ";

    if ( $has_zoom ) {
        $css .= "#{$id} .portfolio-item:hover .portfolio-image img { transform: scale({$zoom_scale}) !important; }";
    }

    wp_register_style( 'axis-folio-runtime', false );
    wp_enqueue_style( 'axis-folio-runtime' );
    wp_add_inline_style( 'axis-folio-runtime', $css );

    ob_start();
    $path = plugin_dir_path( __FILE__ ) . 'build/axis-folio/render.php';
    if ( ! file_exists( $path ) ) $path = plugin_dir_path( __FILE__ ) . 'src/render.php';
    if ( file_exists( $path ) ) include $path;
    return ob_get_clean();
}

add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_style( 'axis-folio-base', plugin_dir_url( __FILE__ ) . 'assets/css/axis-folio-style.css' );
    wp_enqueue_script( 'masonry' );
    wp_enqueue_script( 'imagesloaded' );
    wp_enqueue_script( 'axis-folio-js', plugin_dir_url( __FILE__ ) . 'assets/js/my-jquery.js', array('jquery', 'masonry', 'imagesloaded'), '1.0', true );
});