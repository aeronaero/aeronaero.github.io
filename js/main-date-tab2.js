$(function(){
    date_init();
    back_top();
    smooth_scroll();
});

function date_init() {
    var $bonusList = $('.bonus-list'),
        $bonusListItem = $('.bonus-list li');

    var today = moment().format("YYYY-MM-DD").toString();
    var start = moment('2017-09-19').format("YYYY-MM-DD").toString();
    var end = moment('2017-10-24').format("YYYY-MM-DD").toString();

    if (moment(today).isSameOrAfter(start) && moment(today).isBefore(end)){
        $bonusList.closest('.block-bonus-wrap').show();
        $bonusListItem.each(function(){
            var $this = $(this);
            var newDate = moment($this.data('date')).format("YYYY-MM-DD").toString();
            var newNextDate = moment($this.data('next-date')).format("YYYY-MM-DD").toString();

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
                $dayCount.text(day + ' days left')
            }
        })
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
