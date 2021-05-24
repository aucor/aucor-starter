<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package axio
 */

get_header(); ?>

  <?php
    if (has_action('theme_hero')) {
      do_action('theme_hero');
    }
  ?>

  <div id="primary" class="primary primary--404">

    <article class="entry entry--404">

      <div class="entry__content blocks">

        <p><?php ask_e('404: Page not found description'); ?></p>

        <?php if (class_exists('X_Search_Form')) : ?>
          <?php
            X_Search_Form::render([
              'attr' => [
                'class' => ['search-form--404'],
              ],
            ]);
          ?>
        <?php endif; ?>

      </div>

    </article>

  </div><!-- #primary -->

<?php
get_footer();
