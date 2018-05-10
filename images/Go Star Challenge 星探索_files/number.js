// 參數說明
// 外層class加入js-number-box，執行區塊class加入js-number
// data-start   => 起始數字，請給予純數字，必要參數
// data-stop    => 結束數字，請給予純數字，必要參數
// data-speed   => 跳動速度(秒)，請給予純數字，數字越大越慢
// data-delaytime   => 延遲時間(秒)，請給予純數字，數字越大越慢
// data-commafy => 自動補千位符號，如要使用請設定 true，不使用直接移除此參數
// data-ease    => jQuery 過場效果，可參考 animate ease，不使用直接移除此參數
(function($) {
    $.fn.animateCount = function() {
        return this.each(function() {
            var thisDOM = $(this);

            /*
             * 判斷起始數字和結束數字是否為數字或有無設定
             * 如為空值或不是數字則彈跳提示視窗並強制停止執行
             */
            if (isNaN(thisDOM.data('start'))) {
                alert('data-start 未設定或非數字');
                return false;
            }
            if (isNaN(thisDOM.data('stop'))) {
                alert('data-stop 未設定或非數字');
                return false;
            }
            if (thisDOM.data('speed') && isNaN(thisDOM.data('stop'))) {
                alert('data-speed 非數字');
                return false;
            }
            if (thisDOM.data('delaytime') && isNaN(thisDOM.data('stop'))) {
                alert('data-delaytime 非數字');
                return false;
            }

            /* 取得設定值 */
            var start   = parseInt(thisDOM.data('start'), 10),
                stop    = parseInt(thisDOM.data('stop'), 10),
                commafy = thisDOM.data('commafy'),
                speed   = thisDOM.data('speed') ? parseInt(thisDOM.data('speed'), 10) : 1000,
                delaytime   = thisDOM.data('delaytime') ? parseInt(thisDOM.data('delaytime'), 10) : 0,
                ease    = thisDOM.data('ease') || 'swing';

            $({value: start}).delay(delaytime).animate({value: stop}, {
                duration: speed,
                  easing: ease,
                    step: function() {
                    thisDOM.text( Math.floor(this.value) );
                    if (commafy) thisDOM.text( thisDOM.text().replace(/(-?\d+)(\d{3})/, '$1,$2') );
                },
                complete: function() {
                    if (parseInt(thisDOM.text(), 10) !== stop) {
                        thisDOM.text(stop);
                        if (commafy) thisDOM.text( thisDOM.text().replace(/(-?\d+)(\d{3})/, '$1,$2') );
                    }
                }
            });
        });
    };
})(jQuery);

jQuery(document).ready(function() {
    var isIOS      = navigator.userAgent.match(/(iphone|ipad|ipod);?/i),
        thisPage   = window.opera ? (document.compatMode == 'CSS1Compat' ? jQuery('html') : jQuery('body')) : jQuery('html, body'),
        thisDOM    = jQuery(this),
        thisWindow = jQuery(window),
        boxList    = jQuery('.js-number-box');

    /*
     * 綁定頁面 scroll 事件
     */
    var reloadScroll = function() {
        var thisTop = thisDOM.scrollTop(),
            thisId  = 0;

        /*
         * 使用預先建立 boxList 變數，並以迴圈逐項輸出比對當前頁面捲軸位置
         * 如區塊 top 小於頁面捲軸位置，則用 thisId 記錄迴圈已執行第幾次，直至迴圈全數輸出完畢
         */
        boxList.each(function(idx) {
            var target = jQuery(this);

            if (thisTop >= target.offset().top - thisWindow.height() + 50 || thisWindow.height() + thisTop == thisDOM.height()) {
                if (!target.data('load')) {
                    target.data('load', true).find('.js-number').animateCount()
                }
            };
        });
    };

    /*
     * 判斷是否為 IOS 系統，如是則使用定時器，每一秒重新執行取得當前 scrollTop，解決捲軸滾動時 event 失效問題
     * 反之，則正常綁定捲軸滾動事件
     */
    if (isIOS) {
        setInterval(reloadScroll, 1000);
    } else {
        thisWindow.on('scroll __init', reloadScroll).trigger('__init');
    }
});
