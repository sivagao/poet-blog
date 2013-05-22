$(function () {
    var DROP_SPEED = 250;

    $('.sidebar h3.categories a, .sidebar h3.tags a').click(function (e) {
        e.preventDefault();
        var $ul = $(this).closest('h3').next();
        $ul[ $ul.is(':visible') ? 'slideUp' : 'slideDown' ](DROP_SPEED);
    });

    $('.tweets').tweet({
        username: 'jsantell',
        avatar_size: 32,
        filter: function(t){ return ! /^@\w+/.test(t.tweet_raw_text); },
        count: 5,
        fetch: 15
    });

    $('a.email').each(function () {
        $(this).attr('href', 'mailto:' + 'jsantell' + '@' + 'gmail.com');
    });

    $('.share').sharrre({
        share: {
            googlePlus: true,
            facebook: true,
            twitter: true
        },
        enableTracking: true,
        buttons: {
            googlePlus: { size: 'tall' },
            facebook: { layout: 'box_count' },
            twitter: { count: 'vertical' }
        },
        hover: function (api, options) {
            $(api.element).find('.buttons').show();
        },
        hide: function(api, options) {
            $(api.element).find('.buttons').hide();
        },
        urlCurl: '/sharrre.php' // ewww
    });


    prettyPrint();
});
