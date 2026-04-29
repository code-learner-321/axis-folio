<?php

namespace Axis_Folio_Widget_Addon\widgets;

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;

class Axis_Folio_Widget extends Widget_Base
{
    public function __construct($data = [], $args = null)
    {
        parent::__construct($data, $args);
    }

    public function get_script_depends()
    {
        return ['jquery', 'axis-folio-script'];
    }
    public function get_style_depends()
    {
        return ['axis-folio-style'];
    }
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

    public function get_keywords(): array
    {
        return ['masionary', 'grid', 'gallery', 'portfolio', 'axis folio'];
    }

    public function get_categories()
    {
        return ['general'];
    }

    protected function register_controls()
    {
        $this->start_controls_section(
            'content_section',
            [
                'label' => esc_html__('Settings', 'axis-folio'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'limit',
            [
                'label' => esc_html__('Limit', 'axis-folio'),
                'type' => \Elementor\Controls_Manager::NUMBER,
                'default' => 10,
            ]
        );


        $this->end_controls_section();
    }

    protected function render()
    {
        // 1. The Data (Identical to Gutenberg for a true Hybrid experience)
        $portfolio_items = [
            ['id' => 1, 'title' => 'Data Visualization', 'tags' => ['D3.js', 'React'], 'height' => 500],
            ['id' => 2, 'title' => 'Secure Gateway', 'tags' => ['Go', 'Docker'], 'height' => 300],
            ['id' => 3, 'title' => 'Mobile Banking', 'tags' => ['Flutter', 'Firebase'], 'height' => 600],
            ['id' => 4, 'title' => 'AI Content Writer', 'tags' => ['Python', 'GPT-4'], 'height' => 400],
            ['id' => 5, 'title' => 'Smart Home Hub', 'tags' => ['IoT', 'Node.js'], 'height' => 700],
            ['id' => 6, 'title' => 'Crypto Portfolio', 'tags' => ['Vue', 'Web3'], 'height' => 350],
            ['id' => 7, 'title' => 'E-Learning Portal', 'tags' => ['Next.js', 'PostgreSQL'], 'height' => 550],
            ['id' => 8, 'title' => 'Fitness Tracker', 'tags' => ['Swift', 'HealthKit'], 'height' => 450],
            ['id' => 9, 'title' => 'Event Manager', 'tags' => ['Laravel', 'MySQL'], 'height' => 650],
            ['id' => 10, 'title' => 'Photo Lab', 'tags' => ['Canvas API', 'JS'], 'height' => 380],
        ];

        // 2. The HTML Structure
?>
        <div class="axis-folio-elementor-wrapper">
            <div class="masonry-container">
                <?php foreach ($portfolio_items as $item) : ?>
                    <div class="card">
                        <img
                            src="https://picsum.photos/400/<?php echo esc_attr($item['height']); ?>?sig=<?php echo esc_attr($item['id']); ?>"
                            alt="<?php echo esc_attr($item['title']); ?>">
                        <div class="card-body">
                            <h3 class="card-title"><?php echo esc_html($item['title']); ?></h3>
                            <div class="tags-container">
                                <?php foreach ($item['tags'] as $tag) : ?>
                                    <span class="tag"><?php echo esc_html($tag); ?></span>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
<?php
    }
}
