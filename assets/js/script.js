/**
 * script.js — cser's Blog (Hexo / Icarus Theme)
 *
 * 变更记录：
 * v1.2  2026-03  目录规范化，文件迁移至 assets/js/script.js
 * v1.1  2026-03  全部注释重写为开发者友好格式，补充各模块用途说明
 * v1.0  2015-08  Hexo Icarus 主题初始版本
 *
 * Handles client-side interactions:
 *  - Article share box (Twitter, Facebook, Pinterest, Google+)
 *  - Image caption & FancyBox lightbox wrapping
 *  - Profile card dropdown toggle
 *  - Back-to-top button positioning and scroll behavior
 *
 * Requires: jQuery 3.x, FancyBox 2.x (optional)
 */
(function($){

  /**
   * Back-to-Top offset threshold.
   * Calculates how far the user must scroll before the #toTop button
   * switches to "fixed" position. Falls back to 0 if the element is absent.
   */
  var toTop = $('#toTop').length ? $('#toTop').offset().top - $(window).height() + 20 : 0;

  /* ------------------------------------------------------------------
     Share Box
     Clicking .article-share-link opens a floating box with share links
     for the current article URL. Clicking elsewhere closes any open box.
  ------------------------------------------------------------------ */
  $('body').on('click', function(){
    // Close any open share box when clicking outside of it
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      // Box already exists — toggle it
      var box = $('#' + id);
      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      // First open: build and append the share box HTML
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="fa fa-twitter article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="fa fa-facebook article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="fa fa-pinterest article-share-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="fa fa-google article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);
      $('body').append(box);
    }

    // Hide any previously visible share box, then show this one
    $('.article-share-box.on').hide();
    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    // Prevent clicks inside the box from bubbling up and closing it
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    // Auto-select the URL text for easy copying
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();
    // Open share target in a small popup window
    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  /* ------------------------------------------------------------------
     Image Captions & FancyBox Lightbox
     For each article, wraps bare <img> tags in a FancyBox <a> link and
     appends an optional <span class="caption"> if the image has alt text.
  ------------------------------------------------------------------ */
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      // Skip images already wrapped in a fancybox link
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      // Insert caption text after the image if alt attribute is present
      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      // Wrap image in a FancyBox-compatible anchor
      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    // Group all fancybox links in the same article so they form a gallery
    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  // Initialise FancyBox if the plugin is loaded
  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  /* ------------------------------------------------------------------
     Profile Card Dropdown
     On screens < 1200px the profile sidebar collapses; tapping the
     avatar in the sub-nav toggles a floating card instead.
  ------------------------------------------------------------------ */
  $(document).on('click', function(){
    // Dismiss the card when clicking anywhere outside of it
    $('#profile').removeClass('card');
  }).on('click', '#profile-anchor', function(e){
    e.stopPropagation();
    $('#profile').toggleClass('card');
  }).on('click', '.profile-inner', function(e){
    // Prevent clicks inside the card from closing it
    e.stopPropagation();
  });

  /* ------------------------------------------------------------------
     Back-to-Top Button
     On desktop (≥ 800px): the button becomes "fixed" after the user
     scrolls past the sidebar bottom, aligned to the sidebar's left edge.
     On mobile (< 800px): always fixed, anchored to the right edge.
     CSS overrides the right/left values for mobile via media queries in
     the Mobile & Android Optimizations section of style.css.
  ------------------------------------------------------------------ */
  $(document).on('scroll', function(){
    if ($(document).width() >= 800) {
      if ($(this).scrollTop() > toTop) {
        $('#toTop').addClass('fix');
        $('#toTop').css('left', $('#sidebar').offset().left);
      } else {
        $('#toTop').removeClass('fix');
      }
    } else {
      // Always show fixed on mobile; position is handled by CSS
      $('#toTop').addClass('fix');
      $('#toTop').css('right', 20);
    }
  }).on('click', '#toTop', function(){
    // Scroll back to the top of the page
    $(document).scrollTop(0);
  });

})(jQuery);
