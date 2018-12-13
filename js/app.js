! function(t) {
    "use strict";
    t("a.page-scroll").bind("click", function(a) {
        var o = t(this);
        t("html, body").stop().animate({
            scrollTop: t(o.attr("href")).offset().top - 50
        }, 1250, "easeInOutExpo"), a.preventDefault()
    }), t("body").scrollspy({
        target: ".navbar-fixed-top",
        offset: 51
    }), t(".navbar-collapse ul li a").click(function() {
        t(".navbar-toggle:visible").click()
    }), t("#mainNav").affix({
        offset: {
            top: 100
        }
    })
}(jQuery);

$.getJSON( 'https://i.aeron.aero/api/links', function( data ) {
  var html = '';
  $.each( data, function( key, link ) {
    html = '<li><a href="' + link.url + '">' +
        '<img src="' + link.logo + '"  width="100" alt="" hspace="10">' +
        '</a></li>';
    $('#links-' +  link.group).append(html);
  });
});

$.getJSON( 'https://i.aeron.aero/api/news', function( data ) {
  var items = [];
  var img_class = 'news-item-img-lg';
  $.each( data, function( key, val ) {
    if(key > 1) {
        img_class = '';
    }
    items.push(
        '<div class="col-sm-6 matchHeight">' +
        '<a href="' + val.link + '" target="_blank" class="news-item">' +
        '<div class="news-item-img ' + img_class + '">' +
            '<img src="' + val.img + '" class="img-responsive" alt="">' +
        '</div>' +
        '<h5>' + val.title + '</h5>' +
        '<small lang="en">' + val.date + '</small></a></div>'
    );
  });
  $( "<div/>", {
    "class": "row",
    html: items.join( "" )
    }).appendTo( "#news-collapse" );
    $('#news').addClass('show');
    matchHeight();
});

var lang = new Lang();
var userLang = navigator.language || navigator.userLanguage;
var activeLang = 'en';

lang.dynamic('ar', 'js/langpack/ar.json');
lang.dynamic('jp', 'js/langpack/jp.json');
lang.dynamic('kr', 'js/langpack/kr.json');
lang.dynamic('fr', 'js/langpack/fr.json');
lang.dynamic('ru', 'js/langpack/ru.json');
lang.dynamic('cn', 'js/langpack/cn.json');
lang.dynamic('pt', 'js/langpack/pt.json');
lang.dynamic('es', 'js/langpack/es.json');
lang.dynamic('de', 'js/langpack/de.json');

if(userLang.indexOf('zh') !== -1) {
    activeLang = 'cn'
} else if(userLang.indexOf('ja') !== -1) {
    activeLang = 'jp'
} else if(userLang.indexOf('ru') !== -1) {
     activeLang = 'ru'
} else if(userLang.indexOf('ar') !== -1) {
    activeLang = 'ar'
} else if(userLang.indexOf('ko') !== -1) {
    activeLang = 'kr'
} else if(userLang.indexOf('pt') !== -1) {
    activeLang = 'pt'
} else if(userLang.indexOf('fr') !== -1) {
    activeLang = 'fr'
} else if(userLang.indexOf('es') !== -1) {
    activeLang = 'es'
} else if(userLang.indexOf('de') !== -1) {
    activeLang = 'de'
}

if (location.href.indexOf("#cn") != -1) {
    activeLang = 'cn';
} else if (location.href.indexOf("#jp") != -1) {
    activeLang = 'jp';
} else if (location.href.indexOf("#kr") != -1) {
    activeLang = 'kr';
} else if (location.href.indexOf("#ru") != -1) {
    activeLang = 'ru';
}  else if (location.href.indexOf("#en") != -1) {
    activeLang = 'en';
}  else if (location.href.indexOf("#ar") != -1) {
    activeLang = 'ar';
}  else if (location.href.indexOf("#pt") != -1) {
    activeLang = 'pt';
}  else if (location.href.indexOf("#fr") != -1) {
    activeLang = 'fr';
}  else if (location.href.indexOf("#es") != -1) {
    activeLang = 'es';
}  else if (location.href.indexOf("#de") != -1) {
    activeLang = 'de';
}

$('.active_lang').html(activeLang+'<img src="img/'+activeLang+'.png">');

if(activeLang == 'ar' ) {
    $(".ar_align").css("text-align", "right");
}

if(activeLang == 'cn' ) {
    $(".howto_link").attr("href", "https://aeron.aero/Aeron_HowTo_"+activeLang+".pdf")
}



lang.init({
    defaultLang: 'en',
    currentLang: activeLang
/*        cookie: {
        name: 'langCookie',
        expiry: 365,
        path: '/'
    },
    allowCookieOverride: true */
});

function lang_change(lang) {

    if(lang == 'jp' || lang == 'kr' || lang == 'cn' || lang == 'en' || lang == 'ru' || lang == 'ar' || lang == 'kr' || lang == 'pt' || lang == 'fr' || lang == 'es' || lang == 'de') {
        $('.active_lang').html(lang+'<img src="img/'+lang+'.png">');
        $('#lang_switch').removeClass('in');
       window.lang.change(lang);
        ga('send', {
          hitType: 'event',
          eventCategory: 'lang',
          eventAction: 'change',
          eventLabel: lang
        });

        if(lang == 'cn' ) {
            $(".howto_link").attr("href", "https://aeron.aero/Aeron_HowTo_"+lang+".pdf")
        } else {
            $(".howto_link").attr("href", "https://aeron.aero/Aeron_HowTo.pdf")
        }


        $(".whitepaper_link").attr("href", "https://aeron.aero/AeronWhitepaper.pdf")

        if(lang == 'ar' ) {
           $(".ar_align").css("text-align", "right");
        } else {
            $(".ar_align").css("text-align", "left");
        }

    }

}



matchHeight();

function matchHeight() {
    if (!$().matchHeight) {
        console.error('plugin matchHeight not found');
        return;
    }
    $('.matchHeight').matchHeight();

    $(window).on('resize', function() {
        $.fn.matchHeight._update();
    })
}


$(function(){
 //   date_init();
    back_top();
    smooth_scroll();
});


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


function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
