$(document).ready(() => {
  $('button.tweet').on('click', function() {
    $('.daysOld').html = timeago.format(new Date());
  })
});