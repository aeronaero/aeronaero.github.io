(function ($) {
    'use strict';

    var configProfile = {
        "profile": {"screenName": 'aeron_aero'},
        "domId": 'tweet',
        "maxTweets": 3,
        "enableLinks": true,
        "showUser": true,
        "showTime": true,
        "dateFunction": '',
        "showRetweet": false,
        "showInteraction": true,
        "dataOnly": true,
        "customCallback": handleTweets,
    };

    function handleTweets(tweets) {
        var html = '';
        for (var i = 0, lgth = tweets.length; i < lgth ; i++) {
            var tweetObject = tweets[i];

            html += '<div class="tweet__item"><div class="tweet__inner">'
            + '<p class="tweet__content">' + tweetObject.tweet + '</p>'
            + '<a href="'+ tweetObject.permalinkURL +'" class="tweet__link" target="_blank">' + tweetObject.permalinkURL + '</a>'
            + '<div class="tweet__footer">'
            + '<p class="tweet__info">' + tweetObject.author + '<span class="tweet__time">' + tweetObject.time + '</span>' + '</p>'
            + '</div>'
            + '</div></div>';
        }

        $('#tweet').append(html);
    }

    twitterFetcher.fetch(configProfile);
})(jQuery);
