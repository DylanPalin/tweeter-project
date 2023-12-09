
$(document).ready(function() {
  console.log("ready!");
  $("#textarea").on('input', function() {
    let counter = 140;
    let counterElement = $(this).closest('form').find('.counter');
    counterElement.text(counter - this.value.length);
      if (this.value.length > 140) {
        counterElement.addClass('over-limit');
      } else {
        counterElement.removeClass('over-limit');
      }
    });
  });
