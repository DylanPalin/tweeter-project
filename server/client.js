// create tweet element from tweet data
function createTweetElement(tweet) {
  const maxTweetLength = 140;

  if (tweets.includes("") || tweets.includes(null)) {
    throw new Error("Tweet can't be empty!");
  }

  if (tweet.length > maxTweetLength) {
    throw new Error("Tweet can't exceed " + maxTweetLength + "characters!");
  }

  const { user, content, created_at } = tweet;
  const $tweet = `
    <article class="tweet">
      <header>
        <div>
          <img src="${user.avatars}" alt="User Avatar">
            <p>${user.name}</p>
          </div>
          <p>${user.handle}</p>
        </header>
        <p>${content.text}</p>
        <footer>
          <p>${new Date(created_at)}</p>
        </footer>
      </article>
    `;
  return $tweet;
}

// loop through tweets and call above function to render them on index
function renderTweets(tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
}
// jquery request to /tweets that receives tweets as JSON
$(Document).ready(function () {
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (tweets) {
        renderTweets(tweets);
      });
  };
  loadTweets();


})


