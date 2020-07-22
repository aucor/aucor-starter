/**
 * Project specific gulp configuration
 */

module.exports = {

  /**
   * URL for BrowserSync to mirror
   */
  devUrl: function() {
    return "https://aucor-starter.local";
  },

  /**
   * JS files
   *
   * "build-file-name.js": [
   *   "../node_modules/some-module/some-module.js",
   *   "scripts/cool-scripts.js"
   * ]
   */
  js: function() {
    return {

      // main js to be loaded in footer
      "main.js": [

        // polyfill for external x:link svg (https://github.com/Keyamoon/svgxuse)
        "node_modules/svgxuse/svgxuse.js",

        // polyfill for object-fit
        "node_modules/objectFitPolyfill/dist/objectFitPolyfill.min.js",

        // a11y dialog helpers (https://github.com/edenspiekermann/a11y-dialog)
        "node_modules/a11y-dialog/a11y-dialog.js",

        // vanilla js version of fitvids, that makes iframe videos responsice (https://www.npmjs.com/package/fitvids)
        "node_modules/fitvids/dist/fitvids.js",

        // lightweight lightbox script (https://github.com/rqrauhvmra/Tobi)
        "node_modules/@rqrauhvmra/tobi/js/tobi.js",

        // project specific js
        "assets/scripts/lib/dropdown-menu.js",
        "assets/scripts/lib/mobile-menu.js",
        "assets/scripts/lib/markup-enhancements.js",
        "assets/scripts/main.js"
      ],

      // gutenberg editor specific js
      "editor-gutenberg.js": [

        "assets/scripts/editor-gutenberg.js"

      ]

    }
  },

  /**
   * CSS files
   *
   * "build-file-name.css": [
   *   "../node_modules/some-module/some-module.css",
   *   "styles/main.scss"
   * ]
   */
  css: function() {
    return {
      
      "utils.css": [
        "assets/styles/utils.scss"
      ],

      "main.css": [
        "assets/styles/main.scss"
      ],

      "editor-gutenberg.css": [
        "assets/styles/editor-gutenberg.scss"
      ],

      "editor-classic.css": [
        "assets/styles/editor-classic.scss"
      ],

      "admin.css": [
        "assets/styles/admin.scss"
      ]

    }
  }

};
