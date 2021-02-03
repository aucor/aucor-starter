# Aucor Starter

**🖥 For developer from developers:**

Superior Gutenberg WordPress starter theme with modern build tools by **[Generaxion](https://www.generaxion.com)**. 200+ hours of development over 3 years to make the greatest starting point for WordPress site.

**Demo:** **[starter.aucor.fi](https://starter.aucor.fi)**

**🔌 Required plugins:**

* **[Aucor Core](https://wordpress.org/plugins/aucor-core/)**: Core functionality that is clever to be centrally updated.
* **[Advanced Custom Fields Pro](https://www.advancedcustomfields.com/)**: Some custom blocks use ACF. You can do without, but should remove them.

**🏷 Buzz-words**:

Gutenberg, Gulp, Yarn, SVG, SASS, Browsersync, a11y, l18n, Polylang, Schema.org, Native lazyload, BEM, Babel, Responsive images

![aucor-starter](https://user-images.githubusercontent.com/9577084/75164116-f3dee180-5728-11ea-9eab-e2bfa89805cf.png)

![Google Chrome performance audit](https://user-images.githubusercontent.com/9577084/82218626-d8990200-9924-11ea-8060-263426cde897.png)

## Table of contents

1. [Directory structure](#1-directory-structure)
2. [Setup](#2-setup)
    1. [New site setup](#21-new-site-setup)
    2. [Developer setup](#22-developer-setup)
    3. [Work session setup](#23-work-session-setup)
3. [Components](#3-components)
    1. [Base component](#31-base-component)
    2. [Using components](#32-using-components)
    3. [Creating new component](#33-creating-new-components)
    4. [Validating arguments](#34-validating-arguments)
4. [Modules](#4-modules)
    1. [Default modules](#41-default-modules)
    2. [Module loading](#42-module-loading)
    3. [Module structure](#43-module-structure)
    4. [Creating new modules](#44-creating-new-modules)
    5. [Disabling or deleting modules](#45-disabling-or-deleting-modules)
    6. [Module caveats](#46-module-caveats)
5. [Assets](#5-assets)
    1. [Styles](#51-styles)
    2. [Scripts](#52-scripts)
    3. [SVG](#53-svg)
    4. [Images](#54-images)
    5. [Fonts](#55-fonts)
    6. [Favicon](#56-favicon)
6. [Includes](#7-includes)
    1. [Functions.php](#71-functionsphp)
    2. [\_conf](#72-_conf)
    3. [Helpers](#73-helpers)
    4. [Localization (Polylang)](#74-localization-polylang)
7. [Workflows]()
8. [Philosophy](#8-gutenberg-and-classic-editor)

## 1. Directory structure

| **Directory**                   | **Contents**  |
|---|---|
| `/acf-json/`    | automatically saved JSON versions of site specific fields from Advanced Custom Fields |
| `/assets/`      | global JS, SASS, images, SVG and fonts |
| `/bin/`         | shell scripts for bulk tasks/automations  |
| `/dist/`        | has processed, combined and optimized assets ready to be included to theme |
| `/modules/`     | features that are packaged into modules like blocks, template parts, post-types|
| `/inc/`         | global php files that are not part of template structure/modules |

## 2. Setup

### 2.1 New site setup

Do these theme installation steps before modifying anything.

#### Download & Extract

1. Download this repository
2. Extract into /wp-content/themes/ and rename for project like `sitename`

#### Run setup

![Project setup with setup.sh](https://user-images.githubusercontent.com/9577084/28662834-236bda4e-72c4-11e7-98db-67b25a289b4f.png)

Run setup wizard in theme root with bash `sh bin/setup.sh`

| **Field**                   | **Meaning**  | **Default**  |
|---|---|---|
| **Site name**               | Name in style.css | `Aucor Starter` |
| **Unique id**               | Prefix and ID for code. Recommended length 1-5 characters. | `aucor_starter` |
| **Local development url**   | Browsersync's mirror URL. Stored at `/assets/manifest.js` | `https://aucor-starter.local` |
| **Author name**             |  Author in style.css | `Aucor Oy` |
| **Author URL**              | Author URL in style.css | `https://www.aucor.fi` |

#### Run localizator (if needed)

Theme strings are by default in English but we do support Finnish and probably Swedish in near future. If you would like to initialize strings in these languages, do the following:

1. Run `bin/localizator.sh`
2. Input language code
3. Select to remove language packages after running

#### Install Aucor Core

Some of the functionality of Aucor Starter require plugin Aucor Core. The plugin is centrally updated so that sites using starter will be easier to maintain and there will be less duplicate code from project to project. Aucor Starter won't have fatal errors without it, but for example localization won't work without it.

Download Aucor Core from [WordPress.org](https://wordpress.org/plugins/aucor-core/) or [Github](https://github.com/aucor/aucor-core) and activate.

**Protip**: If you are using composer: `composer require wpackagist-plugin/aucor-core` or WP-CLI: `wp plugin install aucor-core`.

#### First 15 minutes of your new site

Here's optional next steps:

1. Go through the `/modules/` and remove any unneeded. Just throw them to trash.
2. Save logo at `/assets/images/logo.svg`
3. Setup colors and fonts at `/assets/styles/utils/_variables.scss`

### 2.2 Developer setup

Every developer does this before first time working with the project.

1. Open terminal and navigate to `/wp-content/themes/sitename`
2. Run `yarn install` (fetches all node packages for build tools).

**Protip**: If you don't have Gulp installed locally run `npm install --global gulp-cli`. If you are missing Yarn, [install Yarn](https://yarnpkg.com/en/docs/install).

### 2.3 Work session setup

Do this everythime you start to work with the theme.

1. Open terminal and navigate to `/wp-content/themes/sitename`
2. Run `gulp watch` to activate build process in background. You'll get development proxy at http://localhost:3000 where changes to code will be updated automatically to browser (no need to reload).
3. To quit press `ctrl` + `c`

**Protip**: You can also run just `gulp` to build all the resources or just some resources with `gulp styles` or `gulp scripts`. Want to start the watch task but not open the Browsersync in browser? Start watch with quiet mode `qulp watch -q`.

## 3. Components

Components are the first unique building blocks of this theme. They are an evolution of WordPress's `get_template_part()` function that aim to fix underlying issues of that function:

1. **Arguments**: Template parts had no legitimate way to pass arguments (until WP 5.5.0).
2. **Returning and echoing**: All components can be either echoed or HTML markup can be returned.
3. **Validation**: Template part concept won't encourage to validate arguments early and end up with highly nested if checks for the code. In components you can exit early and have separated backend and frontend functions to gather and sanitize data.
4. **Context free**: You can create components to be used in blocks, templates and inside other components. It's up to you how context aware/independent components you want to build.

### 3.1 Base component

Components get their power from abstract class Component that keeps in the structure and required functionality for each component. Every component inherits from this class. The component structure is loosely inspired by React component concept.

### 3.2 Using components

There are two basic ways to use component:

```
Aucor_Teaser::render();
Aucor_Teaser::get();
```

The render function prints out the HTML markup of the component and get will return it. You can pass arguments in an array like so:

```
Aucor_Teaser::render(['id' => 123]);
Aucor_Teaser::render([
  'id'          => 123
  'hide_image'  => true,
]);
```

All components can be interacted with the same way. It is up to the component to validate the given args and pick what to do with what argument.

### 3.3 Creating new components

```php
<?php
/**
 * Component: Componet's name
 *
 * @example
 * Aucor_Components_Name::render([
 *   'title'        => 'Title',
 *   'description'  => 'Descriptive text'
 *   'image'        => 123
 * ]);
 */
class Aucor_Components_Name extends Aucor_Component {

  public static function frontend($data) {
    ?>
    <div <?php parent::render_attributes($data['attr']); ?>>

      <?php if (!empty($data['image'])) : ?>

        <div class="components-name__image">
          Aucor_Image::render([
            'id'        => $data['image'],
            'size'      => 'large',
          ]);
        </div>

      <?php endif; ?>

      <h3 class="components-name__title">
        <?php echo $data['title'] ?>
      </h3>

      <p class="components-name__description">
        <?php echo $data['description'] ?>
      </p>

    </div>

    <?php
  }

  public static function backend($args = []) {

    $default = [

      // required
      'title'       => '',
      'description' => '',

      // optional
      'attr'        => [],
      'image'       => '',

    ];

    // overrides defaults with given args
    $args = wp_parse_args($args, $default);

    // validate arguments
    if (empty($args['title']) || empty($args['description'])) {
      return parent::error('Missing title or/and description');
    }

    // set html attributes
    $args['attr']['class'][] = 'components-name';

    // or make conditioning
    if (!empty($args['image'])) {
      $args['attr']['class'][] = 'components-name--has-image';
    }

    // $args should be so pre-chewed that frontend can just use the data with simple empty() checks or foreach() loops
    return $args;
  }

}
```

### 3.4 Validating arguments

As in example above the rendering of component starts by passing data to backend function in `$args` that passes it to frontend function and renames it to `$data` (just to mentally separate raw input from sanitized).

Here are your validation strategies:

1. **Return error in backend**: `return parent::error('What heppened');` and this error is displayed if WP_DEBUG is activated. In production without WP_DEBUG, nothing is returned.
2. **Set default values in backend**: You should set good `$default` values in start to handle most common cases where all non critical arguments are not passed.
3. **Sanitize HTML attributes in frontend**: For passing big amount of HTML attributes, add them to key => value array and pass to `parent::render_attributes($attributes)`.

## 4. Modules

Modules are the biggest separation to traditional WordPress themes that build on components introduced before. Modules package PHP, HTML, SASS, JS and images to "mini plugins" that operate inside the theme.

### 4.1 Default modules

This theme comes with selection of default modules that are listed here. Modules have their own readme files at `/modules/module-name/docs/README.md`.

A few modules are sort of required or there are more changes needed than just removing the module to remove it. You can of course replace them but they have some critical functions that need to be implemented.

| **Module**             | **Required**   |  **Function**  |
|------------------------|----------------|----------------|
| `/footer/`             | Yes            | Template part for footer |
| `/header/`             | Yes            | Template part for header with menus and logo |
| `/hero/`               | Yes            | Template part for hero section |
| `/image/`              | Yes            | Component to show responsive images |
| `/svg/`                | Yes            | Component to display SVG sprite icons |
| `/teaser/`             | Yes            | Component to display teaser cards |
| `/background/`         | -              | Replacement for core/group block with background color, image or video options. |
| `/button/`             | -              | Replacement for core/button block with ACF block and component. |
| `/core-columns/`       | -              | Gutenberg columns block |
| `/core-embed/`         | -              | Gutenberg embed blocks |
| `/core-gallery/`       | -              | Gutenberg gallery block |
| `/core-heading/`       | -              | Gutenberg heading block |
| `/core-image/`         | -              | Gutenberg image block |
| `/core-list/`          | -              | Gutenberg list block |
| `/core-paragraph/`     | -              | Gutenberg paragraph block |
| `/core-quote/`         | -              | Gutenberg quote block |
| `/core-table/`         | -              | Gutenberg table block |
| `/file/`               | -              | Replacement for core/file block and component |
| `/gravity-forms/`      | -              | Base styles and settings for Gravity Forms + Gutenberg block |
| `/lightbox/`           | -              | Shows gallery/image links to media file as lightbox |
| `/list-terms/`         | -              | Component that shows post's terms of given taxonomy |
| `/media-text/`         | -              | Replacament for core/media-text block |
| `/menu-social/`        | -              | Menu for social media channels with icons |
| `/posts-nav-numeric/`  | -              | Shows numeric navigation for pagination |
| `/search-form/`        | -              | Search form component |
| `/share-buttons/`      | -              | Social share buttons component |
| `/spacer/`             | -              | Replacement for core/spacer block |

### 4.2 Module loading

Each module have in their root a manifest file called `_.json`. This file declares what files needs to be loaded for this module (PHP, JS, SASS).

For PHP files, theme's `functions.php` goes through all `_.json` files and requires files. For assets Gulp goes through all the assets and processes them just like files in `/assets/`.

#### Example: _.json

```json
{
  "meta": {
    "title": "Teaser",
    "version": "1.0.0"
  },
  "php": {
    "inc": [
      "setup.php",
      "component.php"
    ]
  },
  "css": {
    "main.css": [
      "assets/styles/teaser.scss"
    ],
    "admin.css": [],
    "editor-gutenberg.css": [
      "assets/styles/teaser.scss"
    ]
  },
  "js": {
    "main.js": [],
    "editor-gutenberg.js": []
  }
}
```

Notice that SASS and JS files are targetted to specific compiled files. All PHP files are just included so no need to categorize them.

All SVG sprite files in `/assets/sprite/` and images in `/assets/images/` are loaded automatically by Gulp.

All compiled assets go to the same `/dist/` as regular assets.

#### Example: Modifying WP template hierarchy

WordPress has well documented [template hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/) where you can name PHP file in certain way and put it to the root or second level directory of theme and WP finds it and includes it when appropriate.

By default WordPress won't find template files inside modules, but you can easily serve them with a filter in module's `setup.php` like so:

```php
/**
 * Host archive template in module
 */
add_action('template_include', function ($template) {
  if (is_post_type_archive('projects')) {
    return dirname(__FILE__) . '/archive-projects.php';
  }
  return $template;
});
```

### 4.3 Module structure

There are no strict rules on how module should be structured but there are a few recommendations.

#### Repeative naming is good

PHP files are often named very minimally:
 * `setup.php` – hooks and base for feature
 * `component.php` – the component of feature
 * `block.php` – Gutenberg block template
 * `helpers.php` – public helper functions
 * `endpoint.php` – queryable API endpoint
 * `cpt-{name}.php` and `tax-{name}.php` – registering data types

If module includes for example multiple components, you do need to name them better but other than that the directory already "namespaces" the files so there is no need to repeat module's name very much.

#### Avoid excessive subdirectories

Modules bring some extra directories to begin with so don't make the directory situation more complicated if not necessary.

#### Use mini `/assets/`

For assets it's recommended to use simplified `/assets/` structure to separate PHP files and asset files.

### 4.4 Creating new modules

You should create module each time there is a feature that can be packaged into one intact thing. Module can be simple component like button, compatibility with some plugin, everything that goes into some post type or certain changes to wp-admin. You have to consider and decide what makes sense.

1. Create new directory under `/modules/`
2. Add `_.json` (use other modules as example)
3. Add `setup.php` and other needed files

If you have `gulp watch` active while creating modules or modifying `_.json` files the process will stop and Gulp asks you to restart the watch. This is somewhat annoying but we haven't found a smart way to reload list of watched files during watch process.

### 4.5 Disabling or deleting modules

There is built-in way to disable module that prevents including PHP files and assets (for assets you need to run Gulp before taking effect).

Simply add underscore to the directory name to disable it: `teaser => _teaser`.

For deleting a module you can just throw it to the trash and be done with it (for the default modules marked as not required).

### 4.6 Module caveats

Modules are not a perfect solution but pretty simple solution to complex problem. Here are a few issues that you should know.

#### Declaring dependencies

There is no programming way to declare module to depend on another module. You can use resources from other modules but it's up to you to document it.

#### No namespacing

At the moment we still use prefixing instead of namespacing with functions so you should be aware not to have conflicting naming across modules.

#### ACF JSON is tricky

Optimally you would both save and edit Advanced Custom Fields fieldsets so that the JSON files would also be under the module. At the moment ACF doesn't allow this legitimately.

You can load JSON fields from multiple locations but only save them in one. So the modules that come with ACF fields have them loading from the module but if you edit them with ACF the new version is saved in theme's `/acf-json/` and loaded there leaving the old duplicate file in module.

The ultimate solution would be either to have ACF alter the JSON behaviour or have ACF PHP API become so good that you could mostly write fields in PHP.

## 5. Assets

### 5.1 Styles

Styles are written in SASS in `/assets/styles`. There's five separate stylesheets that are compiled automatically to `dist/styles`.

  * `main.scss` front-end styles of website
  * `admin.scss` back-end styles for admin views
  * `editor-classic.scss` back-end styles for old TinyMCE based editor
  * `editor-gutenberg.scss` back-end styles for new Gutenberg editor

#### Direcotry structure

| **Directory** | **File**                  |  **Contents**  |
|-------------------|-----------------------|----------------|
| `/utils/`         | *                     | variables and functions |
| `/utils/`         | `_env.scss`           | environment variables (sass variabled until browser support is better) |
| `/utils/`         | `_variables.scss`     | CSS3 variables |
| `/utils/`         | `_mixins.scss`        | SASS functions |
| `/base/`          | *                     | global styles |
| `/base/`          | `_normalize.scss`     | unify browser defaults |
| `/base/`          | `_typography.scss`    | text base styles |
| `/base/`          | `_blocks.scss`        | Gutenberg base styles |
| `/base/`          | `_media.scss`         | image, svg and iframe base styles |
| `/base/`          | `_forms.scss`         | forms base styles |
| `/base/`          | `_print.scss`         | print base styles |
| `/elements/`      | *                     | global elements |
| `/layout/`        | *                     | layouts and templates |
| `/layout/`        | `_layout.scss`        | global layout styles |
| `/layout/`        | `_404.scss`           | 404 template |
| `/layout/`        | `_front-page.scss`    | front page |
| `/layout/`        | `_index.scss`         | generic archive |
| `/layout/`        | `_page.scss`          | generic page template |
| `/layout/`        | `_search.scss`        | search template |
| `/layout/`        | `_single.scss`        | generic post and custom post template |
| `@node-modules`   | *                     | vendor packages |
| `@modules`        | *                     | module specific styling |

#### Styles workflow

  * When you begin working, start the gulp with `gulp watch`
  * You get Browsersync URL at `https://localhost:3000` (check yours in console). Here the styles will automatically reload when you save your changes.
  * If you make a syntax error, a console will send you a notification and tell where the error is. If Gulp stops running, start it again with `gulp watch`.
  * The Gulp updates `/assets/last-edited.json` timestamps for styles and WP assets use it. This means that cache busting is done automatically.
  * There's Autoprefixer that adds prefixes automatically. (If you have to support very old browsers, set browsers in gulpfile.js)
  * In browser developer tools shows what styles is located in which SASS partial file (SASS Maps)

#### Adding new global styles

  1. Make a new file like `/assets/styles/elements/_card.scss`
  2. Go edit `main.scss`
  3. Import the new file with `@import "elements/card";`

**Protip:** If those styles are needed in Gutenberg editor as well, include the file in `editor-gutenberg.scss` as well.

#### Adding new module styles

  1. Make an new file like `module-name/assets/styles/card.scss`
  2. Import utilities with `@import '../../../../assets/styles/utils.scss';`
  3. Include by editing module's `_.json`

#### Naming

Theme uses [BEM methodology](http://getbem.com/) to organize class names. Quick example:

```
.teaser        <-- normal element (Block)
.teaser__title <-- sub-element    (Element)
.teaser--big   <-- variant        (Modifier)
```

BEM in HTML:
```html
<div class="teaser">
  <h2 class="teaser__title">Lorem ipsum</h2>
</div>
```

BEM in SASS:
```scss
.teaser {
  &__title {
    font-size: 1.25rem;
  }
}
```

**Protip:** Use your own judgement on how deep you should go. There is no right or wrong way. For example `.entry__footer__categories__item__label` might be better as just `.categories__label`.

### 5.2 Scripts

Javascript can be written with modern ES6 syntax as Babel compiles it to work on even older browsers.

#### Directory structure

  * `/lib/` directory for small global scripts
      * `blocks.js` frontend markup enhancements for Gutenberg content
  * `main.js` primary js file that is run in footer
  * `editor-gutenberg.js` modifies gutenberg editor
  * `@node-modules` vendor scripts
  * `@modules` module specific js

#### Default vendor libraries

* [External SVG polyfill: svgxuse](https://github.com/Keyamoon/svgxuse)
* [Responsive video embds: fitvids (jQuery-free)](https://www.npmjs.com/package/fitvids)
* [Accessible modals/mobile menu: a11y-dialog](https://github.com/edenspiekermann/a11y-dialog)

**Protip:** If you are using jQuery, take into account that Aucor Core moves jQuery to the bottom of the document as a speed optimization. If it causes a problem for you, add a filter `add_filter('aucor_core_speed_move_jquery', '__return_false');` (has to be executed from a plugin).


#### Add new global script

Put file in `/assets/scripts/lib/my_script.js`. Add script to main.js (or some other file) in `/assets/manifest.js`:

```js
"main.js": [
  "scripts/main.js"
],
```

**Combine scripts in one file:**
```js
"main.js": [
  "scripts/lib/menu-primary.js",
  "scripts/main.js"
],
```

#### Add vendor script with yarn (node_modules)

First, go to [npmjs.com](https://www.npmjs.com/) and find if your library is avaialble. Add your library in `package.json` devDependencies. Run `yarn install` or `yarn upgrade` (also updates all packages).

Include the script in `/assets/manifest.js`.

Add project libraries in `dependencies` and Gulp libraries in `devDependencies`. Both will go to same `node_modules` but it's much easier to later figure out what goes where.

```js
"main.js": [
  "../node_modules/fitvids/dist/fitvids.js",
  "scripts/main.js"
],
```

**Protip**: Gulp uses [Babel](https://babeljs.io/) to compile ES6 and React syntax to be compatible to older browsers. In some cases this may mess up older scripts from node_modules. If you have problems with the script (weird errors in console), add it to babelIgnores at `manifest.js`.

### 5.3 SVG

#### SVG Sprite

Put all icons to `/assets/sprite/` and Gulp will combine and minify them into `/dist/sprite/sprite.svg`.

In PHP you can get these images with:

```php
<?php Aucor_SVG::render([
  'name' => 'facebook'
]); ?>
```

Theme includes one big SVG sprite `/assets/images/icons.svg`. Add your own svg icons in `/assets/sprite/` and Gulp will add them to this sprite with id from filename.

#### SVG as image

You can also place more complex (multi-colored) SVGs in `/assets/images/` and Gulp will compress them. They can be found in `/dist/images/`

### 5.4 Images

Put your static images in `/assets/images/` and Gulp will compress them a bit. Refer images in `/dist/images/`. In SASS `background('../images/bg.png')`

### 5.5 Fonts

You can put font files in `/assets/fonts/` and Gulp flattens sub directories and serves them to `/dist/fonts/`.

### 5.6 Favicon

You can put favicon files in `/assets/favicon/` and Gulp optimizes images and serves them to `/dist/favicon/`. You can use a tool like [RealFaviconGenerator](https://realfavicongenerator.net/) to make favicon.








###  Image sizes

Image sizes are defined in `/inc/_conf/register-images.php`. Tips for creating image sizes:

  * Base images on commonly used aspect ratios (16:9, 1:1)
  * Make "medium" half of the text columns and "large" full text column
  * Add additional sizes for responsive images (for example teaser_lg, teaser_md, teaser_sm)

### 6.5 Embed images

```php
<?php Aucor_Image::render([
  'id'        => 123,
  'size'      => 'large',
]); ?>
```

Theme has its own function for getting image markup that gives the developer control of which responsive sizes should be used and include lazy loading.

After you have setup WordPress image sizes go to `/inc/_conf/register-image-sizes.php` and setup your "human-sizes" (the sizes you will use as arguments). These human-sizes hold info of the primary image size, supporting sizes and what size the image is displayed.

```php
switch ($human_size) {

  case 'hero':
    return [
      'primary'    => 'hero_md',
      'supporting' => ['hero_lg', 'hero_md', 'hero_sm'],
      'sizes'      => '100vw'
    ];

  case 'thumbnail':
    return [
      'primary'    => 'thumbnail',
      'supporting' => ['full', 'thumbnail'],
      'sizes'      => '250px'
    ];

  default:
    aucor_starter_debug('Image size error - Missing human readable size {' . $human_size . '}', ['aucor_starter_get_image']);

}
```

Notice that many "human-sizes" can use same WordPress image sizes. This is useful for example when same image might be displayed different size on different devices so you can pass different "sizes" attributes for browser. [Read more about sizes attribute](https://css-tricks.com/responsive-images-css/#article-header-id-1).

**Protip:** If you use CSS property `object-fit` it needs special handling to work in IE11 and older. Theme has [object-fit-polyfill](https://github.com/constancecchen/object-fit-polyfill) installed and all you need to do is add special data attribute for img tag like
```php
Aucor_Image::render([
  'id'    => 123,
  'size'  => 'medium',
  'attr'  => ['data-object-fit' => 'cover']
])
```

### 6.6 Lazy load

By default the image function has lazy loading on. Lazy loading uses HTML's native `loading` attribute When emedding image there's three possibilities:

  * Default: Use lazyload `loading="lazy"`
  ```php
  Aucor_Image::render([
    'id'    => 123,
    'size'  => 'medium'
  ])
  ```
  * No lazyload:
  ```php
  Aucor_Image::render([
    'id'      => 123,
    'size'    => 'medium',
    'loading' => 'eager',
  ])
  ```

Native lazy loading is automatically backwards compatible with old browsers and users without JS. This theme won't add lazy load for images inside Gutenberg as this will be done by core some day.


## 6. Includes

Includes is place for all PHP files that are not part of templates. So all filters, actions and functions.

All the functions, hooks and setup should be on their own filer organized at /inc/. The names of files should describe what the file does as following:

  * `register-` configures new settings and assets
  * `setup-` configures existing settings and assets
  * `function-` adds functions to be used in templates

### 6.1 Functions.php

The `/functions.php` is the place to require all PHP files that are not part of the current template. This file should only ever have requires and nothing else.

### 6.2 \_conf

The `/inc/_conf/` directory has some essential settings for theme that you basically want to review in every project and probably will return many times during development.

  * `register-assets.php` has all CSS and JS includes to templates as well as any arbitary code added to header or footer.
  * `register-blocks.php` defines which Gutenberg blocks are allowed. Gutenberg will have UI in future to select these so this will be removed in some future version. Notice that all blocks that are not defined here are not allowed.
  * `register-image-sizes.php` register all image sizes and responsive image sizes.
  * `register-localization.php` add all translatable strings for Polylang.
  * `register-menus.php` define all menu positions.

### 6.3 Helpers

Directory `/inc/helpers/`.

#### Dates

Function: `aucor_starter_get_posted_on()`

Get published date.


Display categories and tags of single post.

#### Hardcoded ids

Function: `aucor_starter_get_hardcoded_id($key)`

Save all harcoded ids in one place in refer them through this function. Example:

```
/**
 * Get hardcoded ID by key
 *
 * @param string $key a name of hardcoded id
 *
 * @return int harcoded id
 */
function aucor_starter_get_hardcoded_id($key = '') {

  switch ($key) {

    case 'some-id':
      return 123;

    default:
      return 0;

  }

}
```

Used in template:
`aucor_starter_get_hardcoded_id('some-id')`

**Protip:** Avoid hardcoding ids if possible. If you really need to do it, centralize them into this function.

#### Last edited

Function: `aucor_starter_last_edited($asset)`

Get last edited timestamp from asset files. Timestamps are saved in `/assets/last-edited.json`.


#### Setup fallbacks

Include fallback function in case critical plugin is not active.

### 6.4 Localization (Polylang)

In depth about file: `/inc/_conf/register-localization.php` (and `/inc/helpers/setup-fallbacks.php`)

Do you have a minute to talk about localization? Good.

We don't really like .po files as they are confusing for customers, their build process is weird and are prone to errors, it's hard to change the "original" text later on and they are slowish to load. What we do like is [Polylang](https://polylang.pro/). If we are running a multi-lingual site, we want to use Polylang's String Translation to translate the strings in theme.

But we don't stop at using just Polylang. It's generally a little pain to have to register all the strings for your theme and it's very easy to forget to add something. We created our own wrapper function to give you error messages for missing string in WP_DEBUG mode.

**But what if I'm only making site in one language?** Well you can be a lazy developer and hardcode things but is that a way to live a life? You can prepare for multiple languages from the start by using these functions and registering your strings already. These functions (and bunch of Polylang's) will work **even if you don't use Polylang**.

#### Registering your strings

Start off by registering some strings.

  * All your strings are registered at `/inc/_conf/register-localization.php` (static pieces of text in theme)
  * You give a unique context (key) and the default text (value) for string. Example `"Header: Greeting" => "Hello"`


You can change these default texts (values) right here and they will update on templates. If you have Polylang installed, these strings will appear automatically on String Translations.

#### Using the strings (Aucor Core)

There are two ways to get translated string

  1. By key (Social share: Title)
  2. By value (Share on social media)

All the default strings are fetched by key. In that way you can go on and replace the default values on `/inc/_conf/register-localization.php` without having to search and replace anything anywhere.

##### Getting string by key

**Return string by key:**

Function: `ask__($key, $lang = null)`

Example: `ask__('Social share: Title')` => 'Share on social media' (or translated version)

**Echo string by key:**

Function: `ask_e($key, $lang = null)`

Example: `ask_e('Social share: Title')` => 'Share on social media' (or translated version)

**Protip:** If you are unsure of what the final text may really be, it's smart to use strings by key. If it makes sense, you can use values by key for everything. Polylang doesn't have it's own "return string by key" but we got your back.

##### Getting string by value

**Return string by value:**

Function: `asv__($key, $lang = null)`

Example: `asv__('Share on social media')` => 'Share on social media' (or translated version)

**Echo string by value:**

Function: `asv_e($key, $lang = null)`

Example: `asv_e('Share on social media')` => 'Share on social media' (or translated version)

**Protip:** This is the "normal" Polylang way of getting your translated strings. The downside is that if the default text you propose will be radically changed in String Translation the code might be hard to read (it will work nevertheless).


#### Debugging your strings

Debugging is the greatest benefit of using our string localization functions instead of Polylang defaults. If you have `WP_DEBUG` set to `true` in `wp-config.php` (which you should while developing), you will get error messages if you forget things. So example:

  * You add to header.php `ask_e('Header: Greeting')`
  * You forget to add this string to `/inc/_conf/register-localization.php`
  * You get error message and PHP error log entry that you tried to use `ask_e('Header: Greeting')` in this file on that line without registering the string

So there's really no excuse to forget to register your strings no more.

## 7. Workflows

### Editorconfig

Theme has an `.editorconfig` file that sets your code editor settings accordingly. Never used Editorconfig? [Download the extension](http://editorconfig.org/#download) to your editor. The settings will automatically be applied when you edit code when you have the extension.

Our settings:
```
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

## 8. Philosophy


### 8.1 Adopting Gutenberg

#### Styles

Aucor Starter includes default Gutenberg styles on front-end and overrides them with from theme. This makes developing both easier and harder:

  * 👍 Makes site more future-proof as Gutenberg will have breaking changes in future where some features will not work properly without correct styles (and default styles will take care of them to some degree).
  * 👎 You may have to override some opinionated defaults.

In Gutenberg editor, there are still lots of default styles so there might be a few inconsistensies between front-end and back-end. This will get better in future versions of Gutenberg and Aucor Starter.

Gutenberg block styles are in `/assets/styles/blocks/`. Each block should have their own file. Also there should be separation for front-end and back-end styles as you'll need to style both. Both styles are defined in same file that is the most convinient way to define them. It does add a bit of unused code to front-end.

#### Scoping

All Gutenberg and Classic Editor content should be inside container with class `.blocks`. You should scope the styles for this to focus on right elements.

#### Margins and widths

In Gutenberg world, each block will define its own width as there can be wide blocks and full width blocks. There are variables to keep widths consistent.

**Protip:** Avoid resetting left and right margins if you are not sure what you are doing. You can easily make an element stick to left side of screen by adding `margin: 0` instead of `margin-top: 0`.

**Protip 2:** Use the mixins `@include spacing-s(margin-top)`, `@include spacing-m(margin-top)` or `@include spacing-l(margin-top)` to have responsive and unified margins.

#### Avoid repeating code

Many blocks support alignment and different widths. Generic styles for these are located in `/assets/styles/_settings-*` and will be enough for most cases. If you have similar features that many blocks use, add them to settings to keep your code clean.

### 8.2 Allowed blocks

Set allowed blocks in `/inc/_conf/register-blocks.php`.

Aucor Starter supports these blocks by default:

```php
// common blocks
'core/paragraph'
'core/image'
'core/heading'
'core/gallery'
'core/list'
'core/quote'
'core/file'

// formatting
'core/table'
'core/freeform' // classic editor

// layout
'core/button'
'core/media-text'
'core/columns'
'core/group'
'core/separator'

// widgets
'core/shortcode'

// embeds
'core/embed'
'core-embed/twitter'
'core-embed/youtube'
'core-embed/facebook'
'core-embed/instagram'
'core-embed/soundcloud'
'core-embed/spotify'
'core-embed/flickr'
'core-embed/vimeo'
'core-embed/issuu'
'core-embed/slideshare'

// reusable blocks
'core/block'
```

**Notice:** All blocks that are not explicitly allowed are disabled. This means that if you install a plugin that has new blocks, those blocks are not shown before you allow them. Gutenberg will provide an UI for this in future and we will drop this feature then.

You can add new blocks by simply finding out their name like `acf/your-custom-block` or `some-plugin/some-block`.

### 8.3 Known Gutenberg issues

Gutenberg has still many improvements and bugfixes on the way. These are some issues at the moment:

  * You cannot disable Inline Image block because it comes from Paragraph block [#12680](https://github.com/WordPress/gutenberg/issues/12680)
  * Many features can't be disabled like paragraph drop caps.
  * Colors can't be scoped to specific blocks. If you register colors for Gutenberg, they will become available to every block that supports colors.

Gutenberg development is moving fast and there are a lot of people working hard to improve Gutenberg.

### 8.4 Classic Editor

You can still use Classic Editor in some post types or all if you like. If you want to completely disable Gutenberg, you might want to re-organize the styles a bit as some styles are shared in `/assets/styles/blocks/`.
