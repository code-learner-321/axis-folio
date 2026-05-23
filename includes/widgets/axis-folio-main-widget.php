<?php

namespace Axis_Folio_Widget_Addon\widgets;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Repeater;
use Elementor\Group_Control_Typography;
use Elementor\Utils;

class Axis_Folio_Widget extends Widget_Base
{
    public function get_name()
    {
        return 'axis-folio-widget';
    }
    public function get_title()
    {
        return \esc_html__('Axis Folio Widget', 'axis-folio');
    }
    public function get_icon()
    {
        return 'eicon-inner-section';
    }
    public function get_categories()
    {
        return ['general'];
    }

    public function get_style_depends()
    {
        return [
            'axis-folio-style',
            'elementor-icons-fa-solid',
            'elementor-icons-fa-regular',
            'elementor-icons-fa-brands'
        ];
    }

    public function get_script_depends()
    {
        return ['jquery', 'axis-folio-script'];
    }

    protected function register_controls()
    {
        // --- CONTENT SECTION ---
        $this->start_controls_section('content_section', [
            'label' => \esc_html__('Portfolio Items', 'axis-folio'),
            'tab' => Controls_Manager::TAB_CONTENT,
        ]);

        $repeater = new Repeater();

        $repeater->add_control('list_title', [
            'label' => \esc_html__('Title', 'axis-folio'),
            'type' => Controls_Manager::TEXT,
            'default' => \esc_html__('Project Title', 'axis-folio')
        ]);

        $repeater->add_control('list_image', [
            'label' => \esc_html__('Image', 'axis-folio'),
            'type' => Controls_Manager::MEDIA,
            'default' => ['url' => Utils::get_placeholder_image_src()]
        ]);

        // Show/Hide Visibility Control solely for the Middle Icon
        $repeater->add_control('show_title_icon', [
            'label' => \esc_html__('Show Icon', 'axis-folio'),
            'type' => Controls_Manager::SWITCHER,
            'label_on' => \esc_html__('Show', 'axis-folio'),
            'label_off' => \esc_html__('Hide', 'axis-folio'),
            'return_value' => 'yes',
            'default' => 'yes',
        ]);

        // Type Text control inside repeater
        $repeater->add_control('list_type_text', [
            'label' => \esc_html__('Type Text', 'axis-folio'),
            'type' => Controls_Manager::TEXT,
            'default' => \esc_html__('Development', 'axis-folio'),
        ]);
        // Prefix Line Width control inside repeater
        $repeater->add_control('title_line_width', [
            'label' => \esc_html__('Prefix Line Width', 'axis-folio'),
            'type' => Controls_Manager::SLIDER,
            'size_units' => ['px'],
            'range' => [
                'px' => ['min' => 0, 'max' => 150, 'step' => 1],
            ],
            'default' => ['size' => 40, 'unit' => 'px'],
        ]);

        // Icon picker control inside repeater (conditional on switcher)
        $repeater->add_control('title_icon', [
            'label' => \esc_html__('Icon', 'axis-folio'),
            'type' => Controls_Manager::ICONS,
            'default' => [
                'value' => 'fas fa-arrow-right',
                'library' => 'fa-solid',
            ],
            'condition' => [
                'show_title_icon' => 'yes',
            ],
        ]);

        // Accent Color control (Line/Icon) inside repeater
        $repeater->add_control('title_accent_color', [
            'label' => \esc_html__('Accent Color (Line/Icon)', 'axis-folio'),
            'type' => Controls_Manager::COLOR,
            'default' => '#333333',
        ]);

        $repeater->add_control('list_url', [
            'label' => \esc_html__('Link', 'axis-folio'),
            'type' => Controls_Manager::URL,
            'placeholder' => \esc_html__('https://your-link.com', 'axis-folio'),
            'show_external' => true,
            'default' => [
                'url' => '',
                'is_external' => false,
                'nofollow' => false,
            ],
        ]);

        $repeater->add_control('list_description', [
            'label' => \esc_html__('Description', 'axis-folio'),
            'type' => Controls_Manager::TEXTAREA
        ]);

        // Show/Hide Switcher Control for Horizontal Line inside Repeater (Placed below description and above tags)
        $repeater->add_control('show_item_separator', [
            'label' => \esc_html__('Show Separator Line', 'axis-folio'),
            'type' => Controls_Manager::SWITCHER,
            'label_on' => \esc_html__('Show', 'axis-folio'),
            'label_off' => \esc_html__('Hide', 'axis-folio'),
            'return_value' => 'yes',
            'default' => 'yes',
        ]);

        $repeater->add_control('list_tags', [
            'label' => \esc_html__('Tags (Comma Separated)', 'axis-folio'),
            'type' => Controls_Manager::TEXT
        ]);

        $this->add_control('portfolio_list', [
            'label' => \esc_html__('Portfolio Items', 'axis-folio'),
            'type' => Controls_Manager::REPEATER,
            'fields' => $repeater->get_controls(),
            'title_field' => '{{{ list_title }}}',
        ]);

        $this->add_control('items_to_show', [
            'label' => \esc_html__('Initial Items to Show', 'axis-folio'),
            'type' => Controls_Manager::NUMBER,
            'default' => 4,
        ]);

        $this->add_control('load_more_text', [
            'label' => \esc_html__('Button Text', 'axis-folio'),
            'type' => Controls_Manager::TEXT,
            'default' => \esc_html__('Load More', 'axis-folio'),
        ]);
        $this->end_controls_section();

        // --- STYLE: GRID & CARD ---
        $this->start_controls_section('style_grid', [
            'label' => \esc_html__('Grid & Card', 'axis-folio'),
            'tab' => Controls_Manager::TAB_STYLE
        ]);

        $this->add_responsive_control('columns', [
            'label' => \esc_html__('Columns', 'axis-folio'),
            'type' => Controls_Manager::SELECT,
            'default' => '2',
            'options' => ['1' => '1', '2' => '2', '3' => '3', '4' => '4'],
            'selectors' => [
                '{{WRAPPER}} .axis-masonry-container' => 'grid-template-columns: repeat({{VALUE}}, 1fr);',
            ],
        ]);

        $this->add_control('grid_gap', [
            'label' => \esc_html__('Grid Gap', 'axis-folio'),
            'type' => Controls_Manager::SLIDER,
            'default' => ['size' => 20],
            'selectors' => [
                '{{WRAPPER}} .axis-masonry-container' => 'grid-gap: {{SIZE}}{{UNIT}};',
            ],
        ]);

        $this->add_control('card_bg', [
            'label' => \esc_html__('Card Background', 'axis-folio'),
            'type' => Controls_Manager::COLOR,
            'default' => '#ffffff',
            'selectors' => [
                '{{WRAPPER}} .axis-ms-card' => 'background: {{VALUE}};',
            ],
        ]);

        $this->add_control('card_radius', [
            'label' => \esc_html__('Corner Radius', 'axis-folio'),
            'type' => Controls_Manager::SLIDER,
            'default' => ['size' => 12],
            'selectors' => ['{{WRAPPER}} .axis-ms-card' => 'border-radius: {{SIZE}}{{UNIT}};']
        ]);

        $this->add_control('enable_shadow', [
            'label' => \esc_html__('Enable Box Shadow', 'axis-folio'),
            'type' => Controls_Manager::SWITCHER,
            'default' => 'yes',
        ]);

        $this->add_control('shadow_color', [
            'label' => \esc_html__('Shadow Color', 'axis-folio'),
            'type' => Controls_Manager::COLOR,
            'default' => 'rgba(0,0,0,0.05)',
            'condition' => ['enable_shadow' => 'yes'],
            'selectors' => [
                '{{WRAPPER}} .axis-ms-card' => 'box-shadow: 0 10px 30px {{VALUE}};',
            ],
        ]);

        $this->add_responsive_control('content_padding', [
            'label' => \esc_html__('Main Content Padding', 'axis-folio'),
            'type' => Controls_Manager::DIMENSIONS,
            'selectors' => ['{{WRAPPER}} .axis-ms-content' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};'],
            'default' => ['top' => 20, 'right' => 20, 'bottom' => 20, 'left' => 20, 'unit' => 'px'],
            'separator' => 'before'
        ]);
        $this->end_controls_section();

        // --- STYLE: HOVER EFFECTS ---
        $this->start_controls_section('style_hover', [
            'label' => \esc_html__('Hover Effects', 'axis-folio'),
            'tab' => Controls_Manager::TAB_STYLE
        ]);
        $this->add_control('hover_shadow_color', [
            'label' => \esc_html__('Hover Shadow Color', 'axis-folio'),
            'type' => Controls_Manager::COLOR,
            'default' => 'rgba(0,0,0,0.15)',
            'selectors' => [
                '{{WRAPPER}} .axis-ms-card:hover' => 'box-shadow: 0 15px 30px {{VALUE}};',
            ],
        ]);
        $this->add_control('zoom_intensity', [
            'label' => \esc_html__('Image Zoom Scale', 'axis-folio'),
            'type' => Controls_Manager::SLIDER,
            'range' => ['px' => ['min' => 1, 'max' => 1.5, 'step' => 0.01]],
            'default' => ['size' => 1.1],
            'selectors' => ['{{WRAPPER}} .axis-ms-card:hover img' => 'transform: scale({{SIZE}});'],
        ]);
        $this->end_controls_section();

        // --- STYLE: TYPE TEXT ---
        $this->start_controls_section('style_type_text_section', [
            'label' => \esc_html__('Type Text', 'axis-folio'),
            'tab' => Controls_Manager::TAB_STYLE,
        ]);

        $this->add_control('type_text_color', [
            'label' => \esc_html__('Text Color', 'axis-folio'),
            'type' => Controls_Manager::COLOR,
            'default' => '#333333',
            'selectors' => ['{{WRAPPER}} .axis-folio-type-text-typo' => 'color: {{VALUE}};'],
        ]);
        $this->add_group_control(
            \Elementor\Group_Control_Typography::get_type(),
            [
                'name'     => 'type_text_typography', // This creates the control group
                'label'    => \esc_html__('Typography', 'axis-folio'),
                'selector' => '{{WRAPPER}} .axis-folio-type-text-typo',
                'fields'   => [
                    'typography' => [
                        'default' => 'yes',
                    ],
                    'text_transform' => [
                        'default' => 'uppercase', // Set default to uppercase
                    ],
                ],
            ]
        );
        $this->add_responsive_control('icon_text_gap', [
            'label' => \esc_html__('Gap Between Icon and Text', 'axis-folio'),
            'type' => Controls_Manager::SLIDER,
            'size_units' => ['px'],
            'range' => [
                'px' => ['min' => 0, 'max' => 50, 'step' => 1],
            ],
            'default' => ['size' => 8, 'unit' => 'px'],
            'selectors' => [
                '{{WRAPPER}} .axis-meta-row' => 'gap: {{SIZE}}{{UNIT}};',
            ],
        ]);

        $this->add_responsive_control('meta_row_padding', [
            'label' => \esc_html__('Padding Control', 'axis-folio'),
            'type' => Controls_Manager::DIMENSIONS,
            'size_units' => ['px', 'em', '%'],
            'selectors' => [
                '{{WRAPPER}} .axis-meta-row' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
            ],
        ]);

        $this->add_responsive_control('meta_row_margin', [
            'label' => \esc_html__('Bottom Margin Spacing', 'axis-folio'),
            'type' => Controls_Manager::SLIDER,
            'size_units' => ['px', 'em'],
            'default' => ['size' => 8, 'unit' => 'px'],
            'selectors' => [
                '{{WRAPPER}} .axis-meta-row' => 'margin-bottom: {{SIZE}}{{UNIT}};',
            ],
        ]);
        $this->end_controls_section();

        // --- STYLE: DESCRIPTION ---
        $this->start_controls_section('style_description', [
            'label' => \esc_html__('Description Text', 'axis-folio'),
            'tab' => Controls_Manager::TAB_STYLE
        ]);

        $this->add_group_control(Group_Control_Typography::get_type(), [
            'name' => 'desc_typography',
            'selector' => '{{WRAPPER}} .axis-ms-description',
        ]);

        $this->add_control('desc_text_color', [
            'label' => \esc_html__('Text Color', 'axis-folio'),
            'type' => Controls_Manager::COLOR,
            'default' => '#666',
            'selectors' => ['{{WRAPPER}} .axis-ms-description' => 'color: {{VALUE}};'],
        ]);

        $this->add_control('desc_text_bg', [
            'label' => \esc_html__('Text Background Color', 'axis-folio'),
            'type' => Controls_Manager::COLOR,
            'selectors' => ['{{WRAPPER}} .axis-ms-description' => 'background-color: {{VALUE}};'],
        ]);

        $this->add_responsive_control('desc_text_padding', [
            'label' => \esc_html__('Text Inner Padding', 'axis-folio'),
            'type' => Controls_Manager::DIMENSIONS,
            'size_units' => ['px', 'em', '%'],
            'selectors' => ['{{WRAPPER}} .axis-ms-description' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};'],
        ]);

        $this->add_responsive_control('desc_bottom_spacing', [
            'label' => \esc_html__('Bottom Spacing (Margin)', 'axis-folio'),
            'type' => Controls_Manager::SLIDER,
            'size_units' => ['px', 'em'],
            'range' => ['px' => ['min' => 0, 'max' => 100]],
            'default' => ['size' => 15],
            'selectors' => ['{{WRAPPER}} .axis-ms-description' => 'margin-bottom: {{SIZE}}{{UNIT}};'],
        ]);

        $this->add_control('desc_display', [
            'label' => \esc_html__('Display Mode', 'axis-folio'),
            'type' => Controls_Manager::SELECT,
            'default' => 'block',
            'options' => [
                'block' => \esc_html__('Full Width (Block)', 'axis-folio'),
                'inline-block' => \esc_html__('Fit Content (Inline Block)', 'axis-folio'),
            ],
            'selectors' => ['{{WRAPPER}} .axis-ms-description' => 'display: {{VALUE}};'],
        ]);
        $this->end_controls_section();

        // --- STYLE: SEPARATOR LINE STYLE OPTIONS (DEDICATED SECTION) ---
        $this->start_controls_section('style_separator_options_section', [
            'label' => \esc_html__('Separator Line Style Options', 'axis-folio'),
            'tab' => Controls_Manager::TAB_STYLE,
        ]);

        $this->add_control('sep_color', [
            'label' => \esc_html__('Line Color', 'axis-folio'),
            'type' => Controls_Manager::COLOR,
            'default' => '#eeeeee',
            'selectors' => ['{{WRAPPER}} .axis-ms-divider' => 'border-top-color: {{VALUE}};'],
        ]);

        $this->add_control('sep_weight', [
            'label' => \esc_html__('Thickness', 'axis-folio'),
            'type' => Controls_Manager::SLIDER,
            'default' => ['size' => 1],
            'selectors' => ['{{WRAPPER}} .axis-ms-divider' => 'border-top-width: {{SIZE}}{{UNIT}};'],
        ]);

        $this->add_responsive_control('sep_spacing', [
            'label' => \esc_html__('Vertical Spacing', 'axis-folio'),
            'type' => Controls_Manager::SLIDER,
            'default' => ['size' => 15],
            'selectors' => ['{{WRAPPER}} .axis-ms-divider' => 'margin-top: {{SIZE}}{{UNIT}}; margin-bottom: {{SIZE}}{{UNIT}};'],
        ]);
        $this->end_controls_section();

        // --- STYLE: TITLE & TAGS ---
        $this->start_controls_section('style_title_tags', [
            'label' => \esc_html__('Title & Tags', 'axis-folio'),
            'tab' => Controls_Manager::TAB_STYLE
        ]);

        $this->add_control('title_color', [
            'label' => \esc_html__('Title Color', 'axis-folio'),
            'type' => Controls_Manager::COLOR,
            'default' => '#333',
            'selectors' => ['{{WRAPPER}} .axis-ms-content h3' => 'color: {{VALUE}};', '{{WRAPPER}} .axis-ms-content h3 a' => 'color: {{VALUE}};'],
        ]);

        $this->add_group_control(Group_Control_Typography::get_type(), [
            'name' => 'title_typography',
            'selector' => '{{WRAPPER}} .axis-ms-content h3'
        ]);

        $this->add_control('tag_heading', [
            'label' => \esc_html__('Tag Styling', 'axis-folio'),
            'type' => Controls_Manager::HEADING,
            'separator' => 'before',
        ]);

        $this->add_control('tag_color', [
            'label' => \esc_html__('Tag Color', 'axis-folio'),
            'type' => Controls_Manager::COLOR,
            'default' => '#61ce70',
            'selectors' => ['{{WRAPPER}} .axis-ms-tag' => 'color: {{VALUE}};']
        ]);

        $this->add_control('tag_bg', [
            'label' => \esc_html__('Tag Background', 'axis-folio'),
            'type' => Controls_Manager::COLOR,
            'default' => '#61ce7015',
            'selectors' => ['{{WRAPPER}} .axis-ms-tag' => 'background-color: {{VALUE}};']
        ]);

        $this->add_responsive_control('tag_padding', [
            'label' => \esc_html__('Tag Padding', 'axis-folio'),
            'type' => Controls_Manager::DIMENSIONS,
            'size_units' => ['px', 'em'],
            'default' => ['top' => 4, 'right' => 10, 'bottom' => 4, 'left' => 10, 'unit' => 'px'],
            'selectors' => ['{{WRAPPER}} .axis-ms-tag' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};'],
        ]);

        $this->add_group_control(Group_Control_Typography::get_type(), [
            'name' => 'tag_typography',
            'selector' => '{{WRAPPER}} .axis-ms-tag'
        ]);
        $this->end_controls_section();

        // --- STYLE: LOAD MORE BUTTON ---
        $this->start_controls_section('style_button', [
            'label' => \esc_html__('Load More Button', 'axis-folio'),
            'tab' => Controls_Manager::TAB_STYLE,
        ]);

        $this->add_responsive_control('btn_align', [
            'label' => \esc_html__('Alignment', 'axis-folio'),
            'type' => Controls_Manager::CHOOSE,
            'options' => [
                'left' => ['title' => \esc_html__('Left', 'axis-folio'), 'icon' => 'eicon-text-align-left'],
                'center' => ['title' => \esc_html__('Center', 'axis-folio'), 'icon' => 'eicon-text-align-center'],
                'right' => ['title' => \esc_html__('Right', 'axis-folio'), 'icon' => 'eicon-text-align-right'],
            ],
            'default' => 'center',
            'selectors' => ['{{WRAPPER}} .axis-load-more-wrap' => 'text-align: {{VALUE}};'],
        ]);

        $this->add_group_control(Group_Control_Typography::get_type(), [
            'name' => 'btn_typography',
            'selector' => '{{WRAPPER}} .axis-btn-load-more',
        ]);

        $this->start_controls_tabs('btn_tabs');
        $this->start_controls_tab('btn_normal', ['label' => \esc_html__('Normal', 'axis-folio')]);
        $this->add_control('btn_color', [
            'label' => \esc_html__('Text Color', 'axis-folio'),
            'type' => Controls_Manager::COLOR,
            'default' => '#ffffff',
            'selectors' => ['{{WRAPPER}} .axis-btn-load-more' => 'color: {{VALUE}};'],
        ]);
        $this->add_control('btn_bg', [
            'label' => \esc_html__('Background Color', 'axis-folio'),
            'type' => Controls_Manager::COLOR,
            'default' => '#333333',
            'selectors' => ['{{WRAPPER}} .axis-btn-load-more' => 'background-color: {{VALUE}};'],
        ]);
        $this->end_controls_tab();

        $this->start_controls_tab('btn_hover', ['label' => \esc_html__('Hover', 'axis-folio')]);
        $this->add_control('btn_color_hover', [
            'label' => \esc_html__('Text Color (Hover)', 'axis-folio'),
            'type' => Controls_Manager::COLOR,
            'default' => '#ffffff',
            'selectors' => ['{{WRAPPER}} .axis-btn-load-more:hover' => 'color: {{VALUE}};'],
        ]);
        $this->add_control('btn_bg_hover', [
            'label' => \esc_html__('Background Color (Hover)', 'axis-folio'),
            'type' => Controls_Manager::COLOR,
            'default' => '#555555',
            'selectors' => ['{{WRAPPER}} .axis-btn-load-more:hover' => 'background-color: {{VALUE}};'],
        ]);
        $this->end_controls_tab();
        $this->end_controls_tabs();

        $this->add_control('btn_radius', [
            'label' => \esc_html__('Border Radius', 'axis-folio'),
            'type' => Controls_Manager::SLIDER,
            'default' => ['size' => 4],
            'selectors' => ['{{WRAPPER}} .axis-btn-load-more' => 'border-radius: {{SIZE}}{{UNIT}};'],
            'separator' => 'before'
        ]);
        $this->end_controls_section();
    }

    protected function render()
    {
        $settings = $this->get_settings_for_display();
        $id = $this->get_id();
        $items = $settings['portfolio_list'];
        $limit = intval($settings['items_to_show'] ?: 4);

        if (empty($items)) {
            return;
        }
?>

        <div id="axis-wrapper-<?php echo esc_attr($id); ?>" class="axis-masonry-wrapper">
            <div class="axis-masonry-container" id="axis-grid-<?php echo esc_attr($id); ?>" data-limit="<?php echo esc_attr($limit); ?>">
                <?php foreach ($items as $index => $item) :
                    $visible = ($index < $limit) ? 'is-visible' : '';
                    $img_id = !empty($item['list_image']['id']) ? $item['list_image']['id'] : false;
                    $img_alt = $img_id ? get_post_meta($img_id, '_wp_attachment_image_alt', true) : '';
                    if (empty($img_alt)) $img_alt = $item['list_title'];

                    $link_key = 'link_' . $index;
                    if (! empty($item['list_url']['url'])) {
                        $this->add_link_attributes($link_key, $item['list_url']);
                    }

                    $item_class = 'elementor-repeater-item-' . $item['_id'];
                    // NEW: Add this to register the repeater item so Elementor injects the CSS
                    $this->add_render_attribute($item_class, 'class', $item_class);

                    $has_title = ! empty($item['list_title']);
                    $has_desc  = ! empty($item['list_description']);
                    $has_tags  = ! empty($item['list_tags']);
                    $has_type  = ! empty($item['list_type_text']);

                    // Evaluate middle icon switcher state inside specific item loop data
                    $show_icon_element = (!isset($item['show_title_icon']) || $item['show_title_icon'] === 'yes');

                    $icon_value = '';
                    if ($show_icon_element && ! empty($item['title_icon']['value'])) {
                        if (is_array($item['title_icon']['value']) && isset($item['title_icon']['value']['id'])) {
                            $icon_value = $item['title_icon']['value']['id'];
                        } elseif (is_string($item['title_icon']['value'])) {
                            $icon_value = $item['title_icon']['value'];
                        }
                    }

                    $has_icon  = ! empty($icon_value);
                    $line_size = isset($item['title_line_width']['size']) ? $item['title_line_width']['size'] : 40;
                    $line_unit = isset($item['title_line_width']['unit']) ? $item['title_line_width']['unit'] : 'px';
                    $accent_color = !empty($item['title_accent_color']) ? $item['title_accent_color'] : '#333333';

                    // Evaluate structural item separator switcher toggle state directly from the repeater loop field
                    $show_item_line = (!isset($item['show_item_separator']) || $item['show_item_separator'] === 'yes');

                    //  $has_any_text = ( $has_title || $has_desc || $has_tags || $has_type || $has_icon || $line_size > 0 );
                    // $has_any_text = ( $has_title || $has_desc || $has_tags || $has_type > 0 );
                ?>
                    <div class="axis-ms-item <?php echo esc_attr($visible); ?>">
                        <div class="axis-ms-card">
                            <?php if (! empty($item['list_url']['url'])) : ?>
                                <a <?php echo $this->get_render_attribute_string($link_key); ?>>
                                <?php endif; ?>

                                <?php if (!empty($item['list_image']['url'])) : ?>
                                    <div class="axis-img-wrapper">
                                        <img src="<?php echo esc_url($item['list_image']['url']); ?>" alt="<?php echo esc_attr($img_alt); ?>" class="ms-img">
                                    </div>
                                <?php endif; ?>

                                <?php if (! empty($item['list_url']['url'])) : ?>
                                </a>
                            <?php endif; ?>

                            <?php if ($has_title || $has_desc || $has_tags || $has_type > 0) { ?>
                                <div class="axis-ms-content">

                                    <?php if ($has_type > 0) { ?>
                                        <div class="axis-meta-row" style="display: flex; align-items: center; flex-wrap: wrap;">
                                            <?php if ($line_size > 0) : ?>
                                                <span class="axis-title-prefix-line" style="display: inline-block; width: <?php echo esc_attr($line_size . $line_unit); ?>; height: 2px; background-color: <?php echo esc_attr($accent_color); ?>; flex-shrink: 0;"></span>
                                            <?php endif; ?>

                                            <?php if ($has_icon) : ?>
                                                <span class="axis-title-icon" style="color: <?php echo esc_attr($accent_color); ?>; display: inline-flex; align-items: center;">
                                                    <?php
                                                    \Elementor\Icons_Manager::render_icon($item['title_icon'], ['aria-hidden' => 'true']);

                                                    if (is_string($icon_value) && ! empty($icon_value)) {
                                                        echo '<i class="' . esc_attr($icon_value) . '" aria-hidden="true" style="font-style: normal; font-variant: normal; text-rendering: auto; -webkit-font-smoothing: antialiased;"></i>';
                                                    }
                                                    ?>
                                                </span>
                                            <?php endif; ?>

                                            <?php if ($has_type) : ?>
                                                <!-- Change the div to use the render attribute -->
                                                <div <?php echo $this->get_render_attribute_string($item_class); ?>>
                                                    <span class="axis-folio-type-text-typo"><?php echo esc_html($item['list_type_text']); ?></span>
                                                </div>
                                            <?php endif; ?>
                                        </div>
                                    <?php } else {
                                        print "";
                                    } ?>

                                    <?php if ($has_title) : ?>
                                        <h3>
                                            <?php if (! empty($item['list_url']['url'])) : ?>
                                                <a <?php echo $this->get_render_attribute_string($link_key); ?> style="color: inherit; text-decoration: none;">
                                                <?php endif; ?>
                                                <?php echo esc_html($item['list_title']); ?>
                                                <?php if (! empty($item['list_url']['url'])) : ?>
                                                </a>
                                            <?php endif; ?>
                                        </h3>
                                    <?php endif; ?>

                                    <?php if ($has_desc) : ?>
                                        <p class="axis-ms-description"><?php echo esc_html($item['list_description']); ?></p>
                                    <?php endif; ?>

                                    <?php if ($show_item_line) : ?>
                                        <hr class="axis-ms-divider">
                                    <?php endif; ?>

                                    <?php if ($has_tags) : ?>
                                        <div class="axis-ms-tags-container">
                                            <?php
                                            $tags = explode(',', $item['list_tags']);
                                            foreach ($tags as $tag) {
                                                $trimmed = trim($tag);
                                                if (!empty($trimmed)) {
                                                    echo '<span class="axis-ms-tag">' . esc_html($trimmed) . '</span>';
                                                }
                                            }
                                            ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                            <?php } else {
                                print "";
                            } ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <?php if (count($items) > $limit) : ?>
                <div class="axis-load-more-wrap">
                    <button id="load-more-<?php echo esc_attr($id); ?>" class="axis-btn-load-more">
                        <?php echo esc_html($settings['load_more_text']); ?>
                    </button>
                </div>
            <?php endif; ?>
        </div>
<?php
    }
}
