<?php
/**
 * Plugin Name:       Axis Folio
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Najubudeen
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       axis-folio
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function create_block_axis_folio_block_init() {
	register_block_type( __DIR__ . '/build/axis-folio' );
}
add_action( 'init', 'create_block_axis_folio_block_init' );

// ELEMENTOR CODE PATTERN SCAFFOLD.........

function axis_folio_enqueue_scripts() {

    wp_enqueue_script('jquery');
    

    wp_enqueue_script(
        'axis-folio-script',
        plugin_dir_url(__FILE__) . 'assets/js/my-jquery.js',
        array('jquery'),
        '1.0.0',
        true
    );
    wp_enqueue_style(
        'axis-folio-style',
        plugin_dir_url(__FILE__) . 'assets/css/axis-folio-style.css',
        array(),
        '1.0.0'
    );
    
}
add_action('wp_enqueue_scripts', 'axis_folio_enqueue_scripts', 20);

function axis_folio_addon() {
    require_once( __DIR__ . '/includes/plugin.php' );
    \Axis_Folio_Plugin_Addon\Plugin::instance();
}
add_action( 'plugins_loaded', 'axis_folio_addon' );