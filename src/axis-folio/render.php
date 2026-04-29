<?php
// 1. The Data (Keep this identical to your JS array for consistency)
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
// use get_block_wrapper_attributes() to ensure Gutenberg styles/classes work
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
    <div class="masonry-container">
        <?php foreach ( $portfolio_items as $item ) : ?>
            <div class="card">
                <img 
                    src="https://picsum.photos/400/<?php echo esc_attr( $item['height'] ); ?>?sig=<?php echo esc_attr( $item['id'] ); ?>" 
                    alt="<?php echo esc_attr( $item['title'] ); ?>"
                >
                <div class="card-body">
                    <h3 class="card-title"><?php echo esc_html( $item['title'] ); ?></h3>
                    <div class="tags-container">
                        <?php foreach ( $item['tags'] as $tag ) : ?>
                            <span class="tag"><?php echo esc_html( $tag ); ?></span>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>