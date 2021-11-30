<?php

require( 'vendor/autoload.php' );

use Timber\Site;

class Starter extends Site {
	function __construct() {
		add_theme_support( 'menus' );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );

		parent::__construct();
	}

	public function add_to_context( $context ) {
		$context['menu'] = new Timber\Menu();

		return $context;
	}

	public function theme_support() {
		add_theme_support( 'menus' );
	}
}

new Starter();