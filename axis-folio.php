<?php
/**
 * Plugin Name:       Axis Folio
 * Description:       Native Masonry Portfolio Block with dynamic pagination and style controls.
 * Version:           0.1.0
 * Author:            Najubudeen
 */

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Registers the block using the metadata from the block.json file.
 */
add_action( 'init', function() {
    register_block_type( __DIR__ . '/build/axis-folio', array(
        'render_callback' => 'axis_folio_render_handler',
    ) );
});

/**
 * Server-side rendering handler for the Axis Folio block.
 */
function axis_folio_render_handler( $attributes, $content ) {
    // Generate or retrieve Unique ID
    $id = ! empty( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : 'af-' . wp_generate_password( 4, false );
    
    // Grid & Card Attributes
    $cols_d = $attributes['columnsDesktop'] ?? 3;
    $cols_t = $attributes['columnsTablet'] ?? 2;
    $cols_m = $attributes['columnsMobile'] ?? 1;
    $gap    = $attributes['gridGap'] ?? 20;
    $radius = $attributes['borderRadius'] ?? 8;
    $bg_col = $attributes['cardBgColor'] ?? '#ffffff';
    $shadow = $attributes['hasShadow'] ?? true;
    $sh_col = $attributes['shadowColor'] ?? 'rgba(0,0,0,0.1)';
    
    // Hover & Zoom
    $has_zoom   = $attributes['hasZoom'] ?? true;
    $zoom_scale = $attributes['zoomScale'] ?? 1.05;
    $show_line  = $attributes['showTagLine'] ?? true;

    // Pagination / Load More Button Styles
    $btn_bg    = $attributes['btnBgColor'] ?? '#111111';
    $btn_color = $attributes['btnTextColor'] ?? '#ffffff';

    $final_shadow = $shadow ? "0 4px 12px {$sh_col}" : "none";
    $border_top   = $show_line ? "1px solid #eee" : "none";

    // Dynamic CSS Injection
    $css = "
        #{$id} { display: block !important; width: 100% !important; margin: 20px auto !important; }
        #{$id} .portfolio-grid { position: relative; width: 100% !important; }
        
        /* Desktop Grid Calculation */
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
            transition: transform 0.3s ease;
        }

        /* Strictly hide items for Load More functionality */
        #{$id} .portfolio-item.is-hidden { 
            display: none !important; 
            visibility: hidden; 
            pointer-events: none; 
        }

        #{$id} .portfolio-image { overflow: hidden !important; line-height: 0; }
        #{$id} .portfolio-image img {
            transition: transform 0.5s ease !important;
            display: block; width: 100%; height: auto;
        }

        #{$id} .portfolio-tags { 
            display: flex; flex-wrap: wrap; gap: 6px; 
            border-top: {$border_top}; 
            padding-top: 12px; 
            margin-top: 10px;
        }

        /* Load More Button Styling */
        #{$id} .portfolio-load-more-btn {
            background-color: {$btn_bg} !important;
            color: {$btn_color} !important;
            padding: 12px 35px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 700;
            font-size: 16px;
            transition: opacity 0.3s ease, transform 0.2s ease;
        }
        #{$id} .portfolio-load-more-btn:hover { 
            opacity: 0.85; 
            transform: translateY(-2px);
        }

        /* Responsive Breakpoints */
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

    // Add Zoom CSS if enabled
    if ( $has_zoom ) {
        $css .= "#{$id} .portfolio-item:hover .portfolio-image img { transform: scale({$zoom_scale}) !important; }";
    }

    // Register and inject inline styles
    wp_register_style( 'axis-folio-runtime-styles', false );
    wp_enqueue_style( 'axis-folio-runtime-styles' );
    wp_add_inline_style( 'axis-folio-runtime-styles', $css );

    // Buffer the render.php output
    ob_start();
    $render_path = plugin_dir_path( __FILE__ ) . 'build/axis-folio/render.php';
    
    if ( file_exists( $render_path ) ) {
        include $render_path;
    } else {
        // Fallback for development structure
        include plugin_dir_path( __FILE__ ) . 'src/render.php';
    }
    
    return ob_get_clean();
}

/**
 * Enqueue scripts and shared styles.
 */
add_action( 'wp_enqueue_scripts', function() {
    // Load Masonry and ImagesLoaded from WordPress Core
    wp_enqueue_script( 'masonry' );
    wp_enqueue_script( 'imagesloaded' );

    // Plugin Assets
    wp_enqueue_style( 'axis-folio-base-style', plugin_dir_url( __FILE__ ) . 'assets/css/axis-folio-style.css', array(), '1.0.0' );
    
    // Your Custom jQuery Logic for Masonry Init and Load More
    wp_enqueue_script( 
        'axis-folio-main-js', 
        plugin_dir_url( __FILE__ ) . 'assets/js/my-jquery.js', 
        array('jquery', 'masonry', 'imagesloaded'), 
        '1.0.0', 
        true 
    );
});

/**
 * Elementor Compatibility (Optional)
 */
function elementor_axis_folio_addon_init() {
    if ( ! did_action( 'elementor/loaded' ) ) {
        return;
    }
    // Check if the file exists before requiring to prevent fatal errors
    $plugin_file = __DIR__ . '/includes/plugin.php';
    if ( file_exists( $plugin_file ) ) {
        require_once $plugin_file;
        \Axis_Folio_Plugin_Addon\Plugin::instance();
    }
}
add_action( 'plugins_loaded', 'elementor_axis_folio_addon_init' );