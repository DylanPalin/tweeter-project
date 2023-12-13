// Ajax logic for scrolling to top of page

$(document).ready(() => {
  $(window).on('scroll', function() {
    $('body').append(`
    <a id="scrollToTop" href="#top"><i class="fas fa-chevron-up"></i></a>
    `);
    this.off();
  });
  $('#scrollToTop i').on('click', function() {
    console.log('clicked');
  });
})