<?php
/**
 * Plugin Name:       Axis Folio
 * Description:       Native Masonry Portfolio Block with dynamic gaps, zoom, and advanced shadow controls.
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
    $has_shadow = $attributes['hasShadow'] ?? true;
    
    // Standard Shadow Attributes
    $s_x = $attributes['shadowX'] ?? 0;
    $s_y = $attributes['shadowY'] ?? 4;
    $s_b = $attributes['shadowBlur'] ?? 12;
    $s_s = $attributes['shadowSpread'] ?? 0;
    $s_c = $attributes['shadowColor'] ?? 'rgba(0,0,0,0.1)';
    
    // Hover Shadow Attributes
    $h_s_x = $attributes['hShadowX'] ?? 0;
    $h_s_y = $attributes['hShadowY'] ?? 8;
    $h_s_b = $attributes['hShadowBlur'] ?? 20;
    $h_s_s = $attributes['hShadowSpread'] ?? 0;
    $h_s_c = $attributes['hShadowColor'] ?? 'rgba(0,0,0,0.2)';

    $base_shadow = $has_shadow ? "{$s_x}px {$s_y}px {$s_b}px {$s_s}px {$s_c}" : "none";
    $hover_shadow = $has_shadow ? "{$h_s_x}px {$h_s_y}px {$h_s_b}px {$h_s_s}px {$h_s_c}" : "none";
    
    $has_zoom   = $attributes['hasZoom'] ?? true;
    $zoom_scale = $attributes['zoomScale'] ?? 1.15;
    $show_line  = $attributes['showTagLine'] ?? true;

    // Load More Button Attributes
    $btn_bg    = $attributes['btnBgColor'] ?? '#111';
    $btn_color = $attributes['btnTextColor'] ?? '#fff';

    $border_top = $show_line ? "1px solid #eee" : "none";

    $css = "
        #{$id} { display: block !important; width: 100% !important; margin: 40px auto !important; }
        #{$id} .portfolio-grid { position: relative; width: 100% !important; }
        
        #{$id} .portfolio-item, #{$id} .grid-sizer {
            width: calc( (100% / {$cols_d}) - ({$gap}px * ({$cols_d} - 1) / {$cols_d}) ) !important;
        }

        #{$id} .gutter-sizer { width: {$gap}px !important; }

        #{$id} .portfolio-item {
            margin-bottom: {$gap}px !important;
            background: {$bg_col} !important;
            border-radius: {$radius}px !important;
            box-shadow: {$base_shadow} !important;
            overflow: hidden !important;
            transition: box-shadow 0.3s ease, transform 0.3s ease !important;
        }

        #{$id} .portfolio-item:hover {
            box-shadow: {$hover_shadow} !important;
        }

        /* Logic to hide items for Load More */
        #{$id} .portfolio-item.is-hidden { 
            display: none !important; 
            visibility: hidden; 
            pointer-events: none; 
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

        #{$id} .portfolio-load-more-btn {
            background-color: {$btn_bg} !important;
            color: {$btn_color} !important;
            padding: 12px 40px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 700;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        #{$id} .portfolio-load-more-btn:hover { opacity: 0.8; transform: translateY(-2px); }

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
    
    wp_enqueue_style(
        'elementor-axis-folio-style',
        plugin_dir_url(__FILE__) . 'assets/css/axis-folio-widget-style.css',
        array(),
        '1.0.0'
    );
    wp_enqueue_script( 'axis-folio-script', plugin_dir_url( __FILE__ ) . 'assets/js/axis-folio-widget-script.js', array('jquery', 'masonry', 'imagesloaded'), '1.0', true );
});

function elementor_axis_folio_addon() {
    if ( ! did_action( 'elementor/loaded' ) ) {
        return;
    }
    require_once( __DIR__ . '/includes/plugin.php' );
    \Axis_Folio_Plugin_Addon\Plugin::instance();
}
add_action( 'plugins_loaded', 'elementor_axis_folio_addon' );