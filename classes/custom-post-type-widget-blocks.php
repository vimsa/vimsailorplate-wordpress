<?php
/**
 * Custom Post Type Widget Blocks Latest Posts
 *
 * @package Custom_Post_Type_Widget_Blocks
 *
 * @since 1.0.0
 */

use Timber\Timber;

/**
 * Core class Custom_Post_Type_Widget_Blocks_Latest_Posts
 *
 * @since 1.0.0
 */

class Custom_Post_Type_Widget_Blocks_Latest_Posts {
	const FILE = __FILE__;

	public function __construct() {
		add_action( 'init', [ $this, 'register_block_type' ] );
	}

	public function register_block_type() {
		register_block_type(
			'vimsa/list-post',
			[
				'attributes'      => [
					'postType'                => [
						'type'    => 'string',
						'default' => 'post',
					],
					'taxonomy'                => [
						'type'    => 'string',
						'default' => 'category',
					],
					'categories'              => [
						'type' => 'string',
					],
					'className'               => [
						'type' => 'string',
					],
					'postsToShow'             => [
						'type'    => 'number',
						'default' => 5,
					],
					'displayPostContent'      => [
						'type'    => 'boolean',
						'default' => false,
					],
					'displayPostContentRadio' => [
						'type'    => 'string',
						'default' => 'excerpt',
					],
					'excerptLength'           => [
						'type'    => 'number',
						'default' => 55,
					],
					'displayPostDate'         => [
						'type'    => 'boolean',
						'default' => false,
					],
					'postLayout'              => [
						'type'    => 'string',
						'default' => 'list',
					],
					'columns'                 => [
						'type'    => 'number',
						'default' => 3,
					],
					'order'                   => [
						'type'    => 'string',
						'default' => 'desc',
					],
					'orderBy'                 => [
						'type'    => 'string',
						'default' => 'date',
					],
				],
				'render_callback' => [ $this, 'render_callback' ],
				'editor_script'   => 'custom-post-type-widget-blocks-editor-script',
				'editor_style'    => 'custom-post-type-widget-blocks-editor-style',
				'style'           => 'custom-post-type-widget-blocks-style',
			]
		);
	}

	public function render_callback( $attributes ) {
		global $post;

		$args = [
			'post_type'        => $attributes['postType'],
			'posts_per_page'   => $attributes['postsToShow'],
			'post_status'      => 'publish',
			'order'            => $attributes['order'],
			'orderby'          => $attributes['orderBy'],
			'suppress_filters' => false,
		];

		$postType = $attributes['postType'];
		if ( $postType === $post->post_type ) {
			$args['post__not_in'] = [ $post->ID ];
		}

		$recentPosts = Timber::get_posts( apply_filters( 'vimsa/list-post/widget_posts_args', $args ) );

		Timber::$locations = __DIR__ . '/../views';

		return $this->{'render_' . $postType}( $recentPosts, $args );
	}

	private function render_post() {}

	private function render_experience($recentPosts) {
		return Timber::compile('posts/experience.twig', [
			'posts' => $recentPosts
		]);
	}
}