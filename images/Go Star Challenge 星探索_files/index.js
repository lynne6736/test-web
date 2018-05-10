(function ($){
	$.fn.MainInIt = function () {
		$.Body.IndexSlick();
        $.Body.CanvasImg();
        $.Body.FunctionName();
	};
    $.fn.IndexSlick= function(){
        $('.step2-slide').slick({
            accessibility: false,
            adaptiveHeight: true,
            dots: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            centerMode: true,
            autoplay: true,
            prevArrow: false,
            nextArrow: false,
            responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 580,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false
                  }
                }
              ]
        });
    };
    $.fn.CanvasImg= function(){
        // for (var i = 1; i <= 5; i++) {            
        //     var canvas = document.getElementById('step2-item'+i).getElementsByTagName("canvas");
        //     var imageTag = document.getElementById('step2-item'+i).querySelector("step2-item-img");
        //     console.log(imageTag);
        //     var imageTagUrl = imageTag.getAttribute("src")
        //     var ctx = canvas.getContext('2d');
        //     var img = new Image();
        //     img.onload = function(){
        //         canvas.width = img.naturalWidth
        //         canvas.height = img.naturalHeight
        //         ctx.drawImage(img, 0, 0);
        //     }
        //     img.src = imgurl;
        // }

    };
    $.fn.FunctionName= function(){

    };
})(jQuery);
$(function(){
    $.Body = $('body');
    $.Window = $(window);
    $.Window.load(function (){
        $.Body.MainInIt();
    });
});