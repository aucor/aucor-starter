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
    3. [Work session setup](#24-work-session-setup)
    4. [First 15 minutes of new site]
3. [Components](#3-components)
    1. [Component.php](#31-componentphp)
    2. [Using components](#32-using-components)
    3. [Creating new component](#33-creating-new-components)
4. [Styles](#4-styles)
    1. [Directory structure](#41-directory-structure)
    2. [Workflow](#42-workflow)
    3. [Adding new files](#43-adding-new-files)
    4. [Naming](#44-naming)
    5. [Tips](#45-tips)
5. [Scripts](#5-scripts)
    1. [Directory structure](#51-directory-structure)
    2. [Workflow](#52-workflow)
    3. [Adding new files](#53-adding-new-files)
    4. [JavaScript syntax](#54-javascript-syntax)
6. [SVG and Images](#6-svg-and-images)
    1. [SVG sprite](#61-svg-sprite)
    2. [Single SVG images](#62-single-svg-images)
    3. [Static Images](#63-static-images)
    4. [Image sizes](#64-image-sizes)
    5. [Embed images](#65-embed-images)
    6. [Lazy load](#66-lazy-load)
    7. [Favicons](#67-favicons)
7. [Includes](#7-includes)
    1. [Functions.php](#71-functionsphp)
    2. [\_conf](#72-_conf)
    3. [Helpers](#73-helpers)
    4. [Navigation](#74-navigation)
    5. [Localization (Polylang)](#75-localization-polylang)
8. [Gutenberg and Classic Editor](#8-gutenberg-and-classic-editor)
    1. [Gutenberg architecture](#81-gutenberg-architecture)
    2. [Allowed blocks](#82-allowed-blocks)
    3. [Known Gutenberg issues](#83-known-gutenberg-issues)
    4. [Classic Editor](#84-classic-editor)
9. [Menus](#9-menus)
    1. [Primary menu](#91-primary-menu)
    2. [Upper menu](#92-upper-menu)
    3. [Social menu](#93-social-menu)
    4. [Dropdown menus](#94-dropdown-menus)
    5. [Mobile menu](#95-mobile-menu)
10. [Editorconfig](#10-editorconfig)
11. [Site specific plugin](#11-site-specific-plugin)

## 1. Directory structure

`/assets/` global JS, SASS, images, SVG and fonts

`/bin/` shell scripts for bulk tasks/automations

`/dist/` has processed, combined and optimized assets ready to be included to theme

`/modules/` features that are packaged into modules like blocks, template parts, post-types

`/inc/` global php files that are not part of template structure/modules

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
|---|---|---|---|---|
| **Site name**               | Name in style.css | `Aucor Starter` |
| **Unique id**               | Prefix and ID for code. Recommended length 1-5 characters. | `aucor_starter` |
| **Local development url**   | Browsersync's mirror URL. Stored at `/assets/manifest.js` | `https://aucor-starter.local` |
| **Author name**             |  Author in style.css | `Aucor Oy` |
| **Author URL**              | Author URL in style.css | `https://www.aucor.fi` |


#### Run localizator (if needed)

@todo

#### Install Aucor Core

Some of the functionality of Aucor Starter require plugin Aucor Core. The plugin is centrally updated so that sites using starter will be easier to maintain and there will be less duplicate code from project to project. Aucor Starter won't have fatal errors without it, but for example localization won't work without it.

Download Aucor Core from [WordPress.org](https://wordpress.org/plugins/aucor-core/) or [Github](https://github.com/aucor/aucor-core) and activate.

**Protip**: If you are using composer: `composer require wpackagist-plugin/aucor-core` or WP-CLI: `wp plugin install aucor-core`.

#### First 15 minutes of your new site

Here's optional next steps:

1. Go through the `/modules/` and remove any unneeded. Just throw them to trash.
2. Save logo at `/assets/images/logo.svg`
3. Setup base variables at `/assets/styles/utils/_variables.scss`
4. Run `gulp && gulp watch`

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

**Protip**: You can also run just `gulp` to build all the resources or just some resources with `gulp styles` or `gulp scripts`. Want to start the watch task but not open the Browsersync? Start watch with quiet mode `qulp watch -q`.



## 3. Components

Components are independent components that can be used in many contexts (forms, menu, teaser etc).
Styles of components should be in `/assets/styles/elements` and named as `_component-name.scss` and will be compiled to `dist/styles/main.css`.

**But why?** WordPress doesn't offer by default a way to make partials where you can pass arguments. This becomes a problem when same partials are used with various contexts and with multiple variations. You can of course make functions but it easily leads you having some partials as functions and others as template-parts. This component structure makes it possible to have partials with and without arguments in a way that is easy to use from project to project.

### 3.1 Component.php

Abstract Class Component that keeps in the structure and required functionality for each component. Every component should inherit this class.

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

#### PHP
Create `components-name.php` to `inc/components/`
```php
<?php
/**
 * Component: Componets name
 *
 * @example
 * Aucor_Components_Name::render([
 *   'title'        => 'Title',
 *   'description'  => 'Descriptive text'
 *   'image'        => 123
 * ]);
 *
 * @package aucor_starter
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

    // in example you can make some data validation
    if (empty($args['title']) || empty($args['description'])) {
      return parent::error('Missing title or/and description');
    }

    // or set attributes like classes
    $args['attr']['class'][] = 'components-name';

    // or make conditioning
    if (!empty($args['image'])) {
      $args['attr']['class'][] = 'components-name--has-image';
    }

    // $args should be so pre-chewed that frontend doesn't have to think anything
    return $args;
  }

}
```
Require it in functions.php.
```php
/**
 * Components
 */
require_once 'components/components-name.php';
```

#### SCSS
Create `_components-name.scss` to `/assets/styles/components/`.

After creating `_components-name.scss` you can import it to main.scss so it compiles with other .scss files. Make sure `gulp watch` is running or run it manually with `gulp styles`.
```scss
/* Components
----------------------------------------------- */

@import "components/components-name";
```

#### JS
If your component will need .js create components-name.js to `/assets/scripts/components/`.

After creating `components-name.js` add it to `/assets/manifest.js` under "project specific js" or anywhere else. Make sure `gulp watch` is running or run it manually with `gulp scripts`.
```js
// project specific js
"scripts/lib/components-name.js",
```

## 4. Styles

Styles are written in SASS in `/assets/styles`. There's five separate stylesheets that are compiled automatically to `dist/styles`.

  * `main.scss` front-end styles of website
  * `admin.scss` back-end styles for admin views
  * `editor-classic.scss` back-end styles for old TinyMCE based editor
  * `editor-gutenberg.scss` back-end styles for new Gutenberg editor

### 4.1 Directory structure

  * `/base/` universal styles and utilities
      * `_variables.scss` colors, fonts, breakpoints
      * `_mixins.scss` all [SASS mixins](http://sass-lang.com/guide)
      * `_normalize.scss` set unifiend base styles to html elements for all browsers
      * `_typography.scss` base styles for typography elements (h1, h2, h3, p, ul, ol, blockquote etc.)
      * `_media.scss` base styles for media elements (img, iframe, svg etc.)
      * `_forms.scss` base styles for forms
      * `_print.scss` styles for printing out the page
  * `/blocks/` Gutenberg block styles for front-end and back-end
      * `_core-` supported core blocks
      * `_settings-` utilities for blocks (alignment, width, color)
  * `/elements/` small components that can be used in many contexts (forms, menu, teaser etc)
  * `/layout/` layouts and page templates
  * `/vendor/` styles for external libraries or WP plugins
  * `@node_modules` vendor packages
      * `breakpoint-sass` [helper mixins](http://breakpoint-sass.com/) for breakpoints

### 4.2 Workflow

  * When you begin working, start the gulp with `gulp watch`
  * You get Browsersync URL at `https://localhost:3000` (check yours in console). Here the styles will automatically reload when you save your changes.
  * If you make a syntax error, a console will send you a notification and tell where the error is. If Gulp stops running, start it again with `gulp watch`.
  * The Gulp updates `/assets/last-edited.json` timestamps for styles and WP assets use it. This means that cache busting is done automatically.
  * There's Autoprefixer that adds prefixes automatically. (If you have to support very old browsers, set browsers in gulpfile.js)
  * In browser developer tools shows what styles is located in which SASS partial file (SASS Maps)

### 4.3 Adding new files

  1. Make a new file like `/assets/styles/elements/_card.scss`
  2. Go edit `main.scss`
  3. Import the new file with `@import "elements/card";`

**Protip:** If those styles are needed in Gutenberg editor as well, include the file in `editor-gutenberg.scss` as well.

### 4.4 Naming

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

### 4.5 Tips

 * Setup responsive font sizes by setting fonts in percentages in `html` and change html font size with media queries. All elements use `rem` for font sizes so all the font size changes happen in html.
 * Don't hesitate to create variables if you have repeating values. Put all variable definitions in `/base/variables/` or at the beginning of the file.
 * Build mobile-first: more `min-width`, less `max-width`.

## 5. Scripts

By default, you get [external SVG polyfill svgxuse](https://github.com/Keyamoon/svgxuse), [jQuery-free fitvids](https://www.npmjs.com/package/fitvids) and our framework for navigation. There is [a11y-dialog](https://github.com/edenspiekermann/a11y-dialog) for accessible overlay menu. Also we synchronize image markup from Classic Editor to Gutenberg in front-end to make styling easier (not critical or some cases even needed).

**Protip:** If you are using jQuery, take into account that Aucor Core moves jQuery to the bottom of the document as a speed optimization. If it causes a problem for you, add a filter `add_filter('aucor_core_speed_move_jquery', '__return_false');`.


### 5.1 Directory structure

The script have very simple structure.

  * `/lib/` directory for small components
      * `menu-primary.js` primary menu functionality
      * `markup-enhancements.js` sync old image markup to Gutenberg style, responsive tables
      * `mobile-menu.js` logic for mobile menu
  * `main.js` main js file that is run in footer
  * `critical.js` scripts that should be run in head
  * `editor-gutenberg.js` modifies gutenberg editor

### 5.2 Workflow

  * When you begin working, start the gulp with `gulp watch`
  * You get Browsersync URL at `https://localhost:3000` (check yours in console). Here the styles will automatically reload when you save your changes.
  * If you make a syntax error, a console will send you a notification and tell where the error is. If Gulp stops running, start it again with `gulp watch`.
  * The Gulp updates `/assets/last-edited.json` timestamps for styles and WP assets use it. This means that cache busting is done automatically.

### 5.3 Adding new files

#### 5.3.1 Add script from file

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

#### 5.3.2 Add script with yarn (node_modules)

First, go to [npmjs.com](https://www.npmjs.com/) and find if your library is avaialble. Add your library in `package.json` devDependencies. Run `yarn upgrade`.

Include the script in `/assets/manifest.js`.

Add project libraries in `dependencies` and Gulp libraries in `devDependencies`. Both will go to same `node_modules` but it's much easier to later figure out what goes where.

```js
"main.js": [
  "../node_modules/fitvids/dist/fitvids.js",
  "scripts/lib/menu-primary.js",
  "scripts/main.js"
],
```

**Protip**: Gulp uses [Babel](https://babeljs.io/) to compile ES6 and React syntax to be compatible to older browsers. In some cases this may mess up older scripts from node_modules. If you have problems with the script, add it to babel exclusions at `gulpfile.js`.

### 5.4 JavaScript syntax

We use [Babel](https://babeljs.io/) to compile the JS. You can use ES6 or React syntax with theme's or Gutenberg's code and it will be compiled to be compatible with older browsers.

## 6. SVG and Images

Gulp will automatically minify images and combine SVG images in one sprite.

### 6.1 SVG sprite

Put all icons to `/assets/sprite/` and Gulp will combine and minify them into `/dist/sprite/sprite.svg`.

In PHP you can get these images with (more exmples in Template tags):

```php
<?php Aucor_SVG::render([
  'name' => 'facebook'
]); ?>
```

Theme includes one big SVG sprite `/assets/images/icons.svg` that has by default a caret (dropdown arrow) and a few social icons. Add your own svg icons in `/assets/sprite/` and Gulp will add them to this sprite with id from filename.

Example: Print out SVG `/assets/sprite/facebook.svg`
```php
<?php Aucor_SVG::render([
  'name' => 'facebook'
]); ?>
```

### 6.2 Single SVG images

You can also place more complex (multi-colored) SVGs in `/assets/images/` and Gulp will compress them. They can be found in `/dist/images/`

### 6.3 Static images

Put your static images in `/assets/images/` and Gulp will compress them a bit. Refer images in `/dist/images/`.

### 6.4 Image sizes

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

### 6.7. Favicons

Add all favicon files to `/assets/favicon/` where they will be moved (and images optimized) to `/dist/favicon/`. Use for example [Real Favicon Generator](https://realfavicongenerator.net/) to make favicon. Add favicon embeds to function `aucor_starter_favicons` in `/inc/_conf/register-assets.php`.

## 7. Includes

Includes is place for all PHP files that are not part of templates. So all filters, actions and functions.

All the functions, hooks and setup should be on their own filer organized at /inc/. The names of files should describe what the file does as following:

  * `register-` configures new settings and assets
  * `setup-` configures existing settings and assets
  * `function-` adds functions to be used in templates

### 7.1 Functions.php

The `/functions.php` is the place to require all PHP files that are not part of the current template. This file should only ever have requires and nothing else.

### 7.2 \_conf

The `/inc/_conf/` directory has some essential settings for theme that you basically want to review in every project and probably will return many times during development.

  * `register-assets.php` has all CSS and JS includes to templates as well as any arbitary code added to header or footer.
  * `register-blocks.php` defines which Gutenberg blocks are allowed. Gutenberg will have UI in future to select these so this will be removed in some future version. Notice that all blocks that are not defined here are not allowed.
  * `register-image-sizes.php` register all image sizes and responsive image sizes.
  * `register-localization.php` add all translatable strings for Polylang.
  * `register-menus.php` define all menu positions.

### 7.3 Helpers

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

### 7.4 Navigation

Directory `/inc/components/` has various components for menus and navigation things.

#### Social share buttons
Function:
```php
Aucor_Share_Buttons::render([
  'section_title' => ask__('Social share: Title')
])
```

Displays share buttons (Facebook, Twitter, LinkedIn, WhatsApp) with link to their sharer.
```php
<?php Aucor_Share_Buttons::render([
  'section_title' => ask__('Social share: Title')
]); ?>
```

#### Numeric posts navigation
Function: `aucor_starter_numeric_posts_nav($custom_query = null, $custom_paged_var = null)`

Displays numeric navigation instead of normal "next page, last page" navigation. Can be used with a custom query. You can even change the pagination variable if you need to.

Main query:
```php
if(have_posts())
  while (have_posts()) : the_post();
    ...
  endwhile;
  Aucor_Posts_Nav_Numeric::render();
endif;
```

Custom query:
```php
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$args = [
  'post_type'       => 'post',
  'posts_per_page'  => 10,
  'paged'           => $paged,
];
$loop = new WP_Query($args);
if($loop->have_posts())
  while ($loop->have_posts()) : $loop->the_post();
    ...
  endwhile;
  Aucor_Posts_Nav_Numeric::render(['wp_query' => $loop]);
endif;
```

Custom query with your own pagination variable "current_page"
```php
$paged = (isset($_GET['current_page']) && !empty($_GET['current_page'])) ? absint($_GET['current_page']) : 1;
$args = [
  'post_type'       => 'post',
  'posts_per_page'  => 10,
  'paged'           => $paged,
];
$loop = new WP_Query($args);
if ($loop->have_posts())
  while ($loop->have_posts() ) : $loop->the_post();
    ...
  endwhile;
  aucor_starter_numeric_posts_nav([
    'wp_query'  => $loop,
    'paged_var' => 'current_page',
  ]);
endif;
```

#### Sub-pages navigation (pretendable)
Function:
```php
Aucor_Menu_Sub_Pages::render()
```

Displays sub-pages for current page in list. If you need to pretend that single post is somewhere in the hierarchy, use global variable pretend_id to display current view to be in certain place in hierarchy

Usage:
```php
Aucor_Menu_Sub_Pages::render([
  'id' => $id
]);
```

Pretend to be someone else (active_id is the id of someone who to pretend):
```php
// single-post.php etc.
Aucor_Menu_Sub_Pages::render([
  'id'        => $id,
  'active_id' => 321,
]);
```

#### Menu toggle btn
Function:
```php
Aucor_Menu_Toggle::render([
  'id'    => $id,
  'attr'  => $args
])
```

Display hamburger button for menu.

#### Menu hooks

##### Carets for primary menu (dropdown icon)

By default we add small SVG carets for menu items that have children in primary menu.

##### Social icons for social menu

We add social icons SVG to menu items in social menu. There's a few most used supported already (like Twitter, Facebook, Youtube, LinkedIn) but you can add your very easily there.

##### Icons to menu by class name

You can add icons to primary menu by adding class `icon-{name-of-the-icon}` like `icon-facebook`.

### 7.5 Localization (Polylang)

In depth about file: `/inc/_conf/register-localization.php` (and `/inc/helpers/setup-fallbacks.php`)

Do you have a minute to talk about localization? Good.

We don't really like .po files as they are confusing for customers, their build process is weird and are prone to errors, it's hard to change the "original" text later on and they are slowish to load. What we do like is [Polylang](https://polylang.pro/). If we are running a multi-lingual site, we want to use Polylang's String Translation to translate the strings in theme.

But we don't stop at using just Polylang. It's generally a little pain to have to register all the strings for your theme and it's very easy to forget to add something. We created our own wrapper function to give you error messages for missing string in WP_DEBUG mode.

**But what if I'm only making site in one language?** Well you can be a lazy developer and hardcode things but is that a way to live a life? You can prepare for multiple languages from the start by using these functions and registering your strings already. These functions (and bunch of Polylang's) will work **even if you don't use Polylang**.

#### Registering your strings

Start off by registering some strings.

  * All your strings are registered at `/inc/_conf/register-localization.php` (static pieces of text in theme)
  * You give a unique context (key) and the default text (value) for string. Example `"Header: Greeting" => "Hello"`

By default you have a few strings there. They are in Finnish by default. You can change them to English by copying and pasting following (we should make this into setup process...)

```php
// titles
'Title: Home'                       => 'Blog',
'Title: Archives'                   => 'Archives',
'Title: Search'                     => 'Search',
'Title: 404'                        => 'Page not found',

// menu
'Menu: Button label'                => 'Menu',
'Menu: Primary Menu'                => 'Primary menu',
'Menu: Social Menu'                 => 'Social media channels',
'Menu: Additional Menu'             => 'Additional menu',
'Menu: Open'                        => 'Open menu',
'Menu: Close'                       => 'Close menu',
'Menu: Open Sub-menu'               => 'Open submenu',
'Menu: Close Sub-menu'              => 'Close submenu',

// 404
'404: Page not found description'   => 'The page might have been deleted or moved to different location. Use the search below to find what you are looking for.',

// search
'Search: Title'                      => 'Search: ',
'Search: Nothing found'              => 'No search results',
'Search: Nothing found description'  => 'No search results found. Try different words.',
'Search: Placeholder'                => 'Search...',
'Search: Screen reader label'        => 'Search from site',
'Search: Submit'                     => 'Search',

// accessibility
'Accessibility: Skip to content'     => 'Skip to content',

// navigation
'Navigation: Numeric pagination'     => 'Show more',
'Navigation: Go to page x'           => 'Go to page %s',
'Navigation: Current page x'         => 'Current page, page %s',
'Navigation: Previous'               => 'Previous page',
'Navigation: Next'                   => 'Next page',

// social
'Social share: Title'                => 'Share on social media',
'Social share: Facebook'             => 'Share on Facebook',
'Social share: Twitter'              => 'Share on Twitter',
'Social share: LinkedIn'             => 'Share on LinkedIn',
'Social share: WhatsApp'             => 'Share on  WhatsApp',

// taxonomies
'Taxonomies: Keywords'               => 'Keywords',
'Taxonomies: Categories'             => 'Categories',

// colors
'Color: White'                       => 'White',
'Color: Black'                       => 'Black',
'Color: Primary'                     => 'Primary color',

// script localization
'Tobi: Prev'                        => 'Previous',
'Tobi: Next'                        => 'Next',
'Tobi: Close'                       => 'Close',
'Tobi: Loading'                     => 'Loading',

```

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

## 8. Gutenberg and Classic Editor

Aucor Starter supports both Gutenberg and Classic Editor though Gutenberg is preferred.

### 8.1 Gutenberg architecture

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

## 9. Menus

By default the starter theme has three menu locations: Primary menu, Upper menu and Social menu.

### 9.1 Primary menu

Theme location: `primary`

Theme's main navigation in header that is build to handle multiple levels.

### 9.2 Additional menu

Theme location: `additional`

Additional navigation items that are not as important as in primary menu. By default, it will only show 1st level and dropdown menus are not supported. If you will need them, take a look st primary menu styles and `main.js`.

### 9.3 Social menu

Theme location: `social`

Optional menu for organization's social media accounts.

How to use:
 * Include template part somewhere `<?php get_template_part('partials/menu-social'); ?>`
 * Create a new menu in WP admin
 * Add custom link items with url to account and title like "Facebook"
 * Menu item gets SVG icon that is based on url
 * Style menu as needed on `/assets/styles/elements/_menu-social.scss`

### 9.4 Dropdown menus

Starter includes rough navigation skeleton that is working out of box for 3 levels (or infinite amount if you put a little bit more CSS into it). Skeleton includes `/assets/scripts/components/dropdown-menu.js` and `/assets/styles/components/_menu-primary.scss`. This menu works with mouse, touch and tabs. Accessibility is built-in!

Inside `main.js` there is the menu init and a few arguments:

```js
component_dropdown_menu({
  desktop_min_width: 890,
  menu: document.querySelector('.primary-navigation'),
});
```

**Protip:** The `desktop_min_width` option will disable or enable some ways to interact with the menu. For example the hover stuff is disabled on "mobile mode".

### 9.5 Mobile menu

Shows and hides the mobile menu. The mobile menu component is essentially a wrapper for [a11y-dialog](https://github.com/edenspiekermann/a11y-dialog) that makes the mobile menu more accessible by trapping the focus inside the menu when it's opened.

```js
component_mobile_menu({
  menu:     document.querySelector('.js-mobile-menu'),
  site:     document.querySelector('.js-page'),
  toggles:  document.querySelectorAll('.js-menu-toggle')
});
```

## 10. Editorconfig

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

## 11. Site specific plugin

It is recommended to create also site specific plugin to store custom post types, custom taxonomies, shortcodes, ACF fields etc information architecture. There is nothing stopping you from defining them into theme, but we find it better to isolate information architecture outside of theme as those post types and taxonomies will remain when theme gets rebuild.
