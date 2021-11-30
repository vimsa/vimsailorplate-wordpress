<?php

use Timber\Post;
use Timber\Timber;

$context = Timber::context();
$context['post'] = new Post;
Timber::render('index.twig', $context);
