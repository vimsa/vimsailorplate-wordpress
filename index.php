<?php
/*
Plugin Name: Villa Embrace
*/

require __DIR__ . '/classes/custom-post-type-widget-blocks.php';

new Custom_Post_Type_Widget_Blocks_Latest_Posts();

function embrace_enqueue_block_editor_assets() {
	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php' );
}