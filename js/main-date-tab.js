$(function(){
    date_init();
    back_top();
    smooth_scroll();
});

function date_init() {
    var $bonusList = $('.bonus-list'),
        $bonusListItem = $('.bonus-list li');

    var today = moment.utc().format("YYYY-MM-DD").toString();
    var start = moment.utc('2017-09-19').format("YYYY-MM-DD").toString();
    var end = moment.utc('2017-10-23').format("YYYY-MM-DD").toString();


    if (moment(today).isSameOrAfter(start) && moment(today).isBefore(end)){
        $bonusList.closest('.block-bonus-wrap').show();
        $bonusListItem.each(function(){
            var $this = $(this);
            var newDate = moment.utc($this.data('date')).format("YYYY-MM-DD").toString();
            var newNextDate = moment.utc($this.data('next-date')).format("YYYY-MM-DD").toString();

            $this.removeClass('disabled').removeClass('active')

            if (moment(newDate).isSameOrBefore(today) && moment(today).isBefore(newNextDate)) {
                $this.removeClass('disabled').addClass('active')
            } else if (newDate < today){
                $this.removeClass('active').addClass('disabled')
            } else {
                $this.removeClass('active').removeClass('disabled')
            }

            if ($this.hasClass('active')) {
                var $dayCount = $this.find('.bonus-date span');
                var day = moment(newNextDate).diff(moment(today), 'days');
                if(day==1) {
                  $dayCount.text(day + ' day left')
                } else {
                  $dayCount.text(day + ' days left')
                }
                $('.js-extra-tokens').text("with " + $this.find(".bonus-value").text() + " bonus");
            }
        });

        setTimeout(function() {
            var total = parseInt($(".arn_total").text().replace(/,/g, ''));
            var activeIndex = $bonusListItem.filter('.active').index();
            var stepTokenVal = 0;
            $bonusListItem.each(function(index){
                var $this = $(this);
                var $token = $this.find('.bonus-token');
                var tokenVal = $token.data('token');
                stepTokenVal += tokenVal;

                $token.text(tokenVal.toLocaleString());
                if (index < activeIndex) {
                    $token.text("0 ARN left");
                }
                if (index == activeIndex) {
                    tokenVal = stepTokenVal - total;
                    if (tokenVal <= 0) {
                        $token.text("0 ARN left");
                        $this.closest('li').removeClass('active').addClass('disabled')
                    } else {
                        $token.text(tokenVal.toLocaleString() + " ARN left");
                    }
                }
                if (index > activeIndex) {
                    $token.text("up to " +  tokenVal.toLocaleString() + " ARN");
                }
            });
        }, 100);

        //.find('.bonus-token').text()
        //
        // up to 10,000,000 ARN

        // ARN left

    } else if (moment(today).isBefore(start)){
        $bonusList.closest('.block-bonus-wrap').show();
    }

}

function back_top() {
    $(function(fix) {
        var el = fix('.arrow-up-wrap');
        fix(window).on('scroll', function() {
            el['fade' + (fix(this).scrollTop() > 200 ? 'In' : 'Out')](500);
        });
    });
}

function smooth_scroll() {
    var hash;
    $('body').on('click', ".arrow-up", function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            hash = this.hash;
            scrollTo(hash);
        }
    });
}
function scrollTo(hash) {
    if(!hash) return false;
    var $el = $(hash);
    if (!$el.length) return false;
    $('html, body').animate({
        scrollTop: $(hash).offset().top
    }, 600);
}
