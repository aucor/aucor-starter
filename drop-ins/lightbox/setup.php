<?php
/**
 * Setup: Lightbox
 *
 * @package aucor_starter
 */

/**
 * Localization
 */
add_filter('aucor_core_pll_register_strings', function($strings) {

  return array_merge($strings, [

    'Lightbox: Prev'          => 'Edellinen',
    'Lightbox: Next'          => 'Seuraava',
    'Lightbox: Close'         => 'Sulje',
    'Lightbox: Loading'       => 'Lataa',

  ]);

}, 10, 1);

/**
 * Enqueue scripts and styles
 */
add_action('wp_enqueue_scripts', function() {

  wp_localize_script('aucor_starter-js', 'theme_strings_lightbox', [
    'prev'    => ask__('Lightbox: Prev'),
    'next'    => ask__('Lightbox: Next'),
    'close'   => ask__('Lightbox: Close'),
    'loading' => ask__('Lightbox: Loading'),
  ]);

});
