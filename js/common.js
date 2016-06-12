'use strict';
/*global $*/
/*global Cookies*/
$('document').ready(function() {
    var language = Cookies.get('lang') || 'en';
    $(document.documentElement).attr('lang', language);
    $('.dropdown-button').dropdown({
        hover: false
    });
    $(".lang-pick").click(function() {
        var lang = $(this).attr("di");
        Cookies.set('lang', lang);
        $(document.documentElement).attr('lang', lang);
    });
});