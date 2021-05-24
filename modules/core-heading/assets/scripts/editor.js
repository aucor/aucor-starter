/* ==========================================================================
  core-heading editor
========================================================================== */

/**
 * Modify alignment options
 */
wp.hooks.addFilter('blocks.registerBlockType', 'x/filters', (settings, name) => {

  if (name === 'core/heading') {
    return lodash.assign({}, settings, {
      supports: lodash.assign({}, settings.supports, {
        align: false,
      })
    });
  }
  return settings;

});
