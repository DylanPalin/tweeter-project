/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// 

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// create tweet element from tweet data
function createTweetElement(tweet) {
  const { user, content, createdAt } = tweet;
  const date = timeago.format(tweet.createdAt);
  const $tweet = `
      <article>
          <header class="userThumbs">
            <img class="pfpThumb" src="${escape(user.avatars)}"></img>
            <h3>${escape(user.name)}</h3>
            <h4>${escape(user.handle)}</h4>
          </header>

          <div class="tweetContent">
            <p class="userTweet">${escape(content.text)}</p>
          </div>

          <footer class="navIcons">
            <p class="daysOld">${escape(date)}</div>
            <div class="icons">
              <button class="flagButton">
                <i class="fa-solid fa-flag"></i>
                <button class="retweetButton">
                  <i class="fa-solid fa-retweet"></i>
                  <button class="likeButton">
                    <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
    `;
  return $tweet;
}



// loop through tweets and call above function to render them on index
const renderTweets = tweets => {
  const existingTweets = $('.tweet-container');
  for (const tweet of tweets) {
    existingTweets.prepend(createTweetElement(tweet));
  }
};

$(document).ready('writeNew', (event) => {
  const newTweetPanel = () => {
    if ($('.new-tweet').is(':hidden')) {
      $('.new-tweet').slideDown('slow');
      $('#textarea').focus();
    } else {
      $('.new-tweet').slideUp('slow');
    }
  }
});


// validate and submit tweet when button is clicked
$(document).ready(function (event) {
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (tweets) {
        renderTweets(tweets);
      })
  };
  loadTweets();

  $("form").submit(function (event) {
    event.preventDefault();

    let formData = {
      text: $('#textarea').val()
    };

    if (formData.text.length > 140) {
      $('#textarea').addClass('error');
      $('#error').remove();
      $('#tweetButton').after('<p id="error">Your tweet is too long!</p>');
    }

    if (formData.text.length === 0) {
      $('#textarea').addClass('error');
      $('#error').remove();
      $('#tweetButton').after('<p id="error">Your tweet is too short!</p>');
    }

    if (formData.text.length > 0 && formData.text.length <= 140) {
      $('#error').remove();
      $('#textarea').removeClass('error');

      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData,
      })
        .done(() => {

          $.get('/tweets', function (theData) {
            $('.tweet-container').prepend(createTweetElement(theData[theData.length - 1]));
            $('#publish')[0].reset();
            $('#counter').text(140);

          });
        })
    }
  });
});

