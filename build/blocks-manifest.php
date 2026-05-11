<?php
// This file is generated. Do not modify it manually.
return array(
	'axis-folio' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/axis-folio',
		'version' => '0.1.0',
		'title' => 'Axis Folio',
		'category' => 'widgets',
		'icon' => 'layout',
		'attributes' => array(
			'uniqueId' => array(
				'type' => 'string'
			),
			'items' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'columnsDesktop' => array(
				'type' => 'number',
				'default' => 3
			),
			'columnsTablet' => array(
				'type' => 'number',
				'default' => 2
			),
			'columnsMobile' => array(
				'type' => 'number',
				'default' => 1
			),
			'borderRadius' => array(
				'type' => 'number',
				'default' => 8
			),
			'hasShadow' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showTags' => array(
				'type' => 'boolean',
				'default' => true
			),
			'cardBgColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'hCardBgColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'tagBgColor' => array(
				'type' => 'string',
				'default' => '#f0f0f0'
			),
			'tagTextColor' => array(
				'type' => 'string',
				'default' => '#555555'
			),
			'hasZoom' => array(
				'type' => 'boolean',
				'default' => true
			),
			'zoomScale' => array(
				'type' => 'number',
				'default' => 1.05
			),
			'showTagLine' => array(
				'type' => 'boolean',
				'default' => true
			),
			'gridGap' => array(
				'type' => 'number',
				'default' => 20
			),
			'titleColor' => array(
				'type' => 'string',
				'default' => '#111111'
			),
			'titleFontSize' => array(
				'type' => 'number',
				'default' => 20
			),
			'descColor' => array(
				'type' => 'string',
				'default' => '#666666'
			),
			'descFontSize' => array(
				'type' => 'number',
				'default' => 16
			),
			'tagFontSize' => array(
				'type' => 'number',
				'default' => 11
			),
			'enableLoadMore' => array(
				'type' => 'boolean',
				'default' => false
			),
			'postsPerPage' => array(
				'type' => 'number',
				'default' => 6
			),
			'loadMoreText' => array(
				'type' => 'string',
				'default' => 'Load More'
			),
			'btnBgColor' => array(
				'type' => 'string',
				'default' => '#111111'
			),
			'btnTextColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'btnHovBgColor' => array(
				'type' => 'string',
				'default' => '#333333'
			),
			'btnHovTextColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'shadowX' => array(
				'type' => 'number',
				'default' => 0
			),
			'shadowY' => array(
				'type' => 'number',
				'default' => 4
			),
			'shadowBlur' => array(
				'type' => 'number',
				'default' => 12
			),
			'shadowSpread' => array(
				'type' => 'number',
				'default' => 0
			),
			'shadowColor' => array(
				'type' => 'string',
				'default' => 'rgba(0,0,0,0.1)'
			),
			'hShadowX' => array(
				'type' => 'number',
				'default' => 0
			),
			'hShadowY' => array(
				'type' => 'number',
				'default' => 8
			),
			'hShadowBlur' => array(
				'type' => 'number',
				'default' => 20
			),
			'hShadowSpread' => array(
				'type' => 'number',
				'default' => 0
			),
			'hShadowColor' => array(
				'type' => 'string',
				'default' => 'rgba(0,0,0,0.2)'
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	)
);
