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
			'shadowColor' => array(
				'type' => 'string',
				'default' => 'rgba(0,0,0,0.1)'
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
