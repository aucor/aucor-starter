<?php
/**
 * Setup: core/table block
 *
 * @package aucor_starter
 */

/**
 * Allow block
 */
add_filter('allowed_block_types', function($blocks, $post) {

  $blocks[] = 'core/table';
  return $blocks;

}, 11, 2);