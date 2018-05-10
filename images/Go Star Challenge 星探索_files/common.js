(function ($){
    $.fn.CommonInIt = function () {
        new WOW().init();//WOW效果
        $.Body.ScrollToTag();//點按鈕滾動至區塊
        $.Body.MenuClick();//手機選單收合
        $.Body.HeaderScroll();//滾動隱藏
    };
    $.fn.ScrollToTag= function(){
        // 首頁點選scrolldown    
        $.Body.on('click','.js-scrollToTag',function(){
            var TagId= $(this).attr('data-scrollTo');
            $("html, body").animate({ scrollTop: $(TagId).offset().top }, 500);
        });
    };
    $.fn.MenuClick= function(){
        $.Body.on('click', '.js-menu-link', function(event) {
            var bodtValue = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
            if (bodtValue == 'mobile') { // 992以下
                $('.menu,.js-menu-link,body').toggleClass('active');
            }            
        });
        $.Body.on('click', '.js-menu-down', function(event) {
            var bodtValue = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
            if (bodtValue == 'mobile') { // 992以下
                $('.js-menu-down').toggleClass('active');
            }            
        });
    };
    $.fn.HeaderScroll= function(){
        // header
        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = $('header').outerHeight();

        $(window).scroll(function (event) {
            didScroll = true;
        });
        setInterval(function () {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);
        function hasScrolled() {
            var st = $(this).scrollTop();
            // Make sure they scroll more than delta
            if (Math.abs(lastScrollTop - st) <= delta)
                return;
            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            if (st > lastScrollTop && st > navbarHeight) {
                // Scroll Down
                $('header').addClass('nav-up');
            } else {
                // Scroll Up
                if (st + $(window).height() < $(document).height()) {
                    $('header').removeClass('nav-up');
                }
            }
            lastScrollTop = st;
        }
    };
})(jQuery);
$(function(){
    $.Body = $('body');
    $.Window = $(window);
    $.breakpoint = {}; //斷點
    $.Window.load(function (){
        $('#loading').delay(500).fadeOut(500);
        $.Body.CommonInIt();
    });
});