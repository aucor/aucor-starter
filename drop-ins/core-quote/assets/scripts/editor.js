/* ==========================================================================
  core-quote editor
========================================================================== */

/**
 * Modify style variants
 */
wp.domReady(() => {

  wp.blocks.unregisterBlockStyle('core/quote', 'large');

});

/**
 * Modify alignment options
 */
wp.hooks.addFilter('blocks.registerBlockType', 'aucor-starter/filters', (settings, name) => {

  if (name === 'core/quote') {
    return lodash.assign({}, settings, {
      supports: lodash.assign({}, settings.supports, {
        align: false,
      })
    });
  }
  return settings;

});
