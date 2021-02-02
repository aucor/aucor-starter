/* ==========================================================================
  core-gallery editor
========================================================================== */

/**
 * Modify alignment options
 */
wp.hooks.addFilter('blocks.registerBlockType', 'aucor-starter/filters', (settings, name) => {

  if (name === 'core/gallery') {
    return lodash.assign({}, settings, {
      supports: lodash.assign({}, settings.supports, {
        align: ['wide'],
      }),
      attributes: lodash.assign({}, settings.attributes, {
        align: lodash.assign({}, settings.attributes.align, {
          default: 'wide',
        })
      }),
    });
  }
  return settings;

});