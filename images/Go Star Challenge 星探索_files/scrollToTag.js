jQuery(document).ready(function() {
    var isIOS      = navigator.userAgent.match(/(iphone|ipad|ipod);?/i),
        thisPage   = window.opera ? (document.compatMode == 'CSS1Compat' ? jQuery('html') : jQuery('body')) : jQuery('html, body'),
        thisDOM    = jQuery(this),
        thisWindow = jQuery(window),
        boxList    = jQuery('.js-scrollToTag-box');

    /*
     * 宣告項目清單變數，並同時綁定 click 事件
     */
    var scrollList = jQuery('nav.js-scrollToTag-list').on('click', 'a.list-step', function(e) {
        e.preventDefault();

        /*
         * 將 A 連結所設定的 data-id 取出轉換為 jQuery 變數
         * 下次可直接提取使用，不用再重新宣告變數，減少 loading
         */
        var target = jQuery(this);
        if (!target.data('dom')) target.data('dom', jQuery('#' + target.data('id')));

        /*
         * 執行頁面捲動，並在執行完之後，將列表指定項目補上 class active
         * 同時清除掉同一層級並帶有 class active 之樣式
         */
        thisPage.animate({
            scrollTop: target.data('dom').offset().top
        }, 'slow', function() {
            target.addClass('active').siblings('.active').removeClass('active');
        });
    }).find('a.list-step');

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
            if (thisTop >= jQuery(this).offset().top || thisWindow.height() + thisTop == thisDOM.height()) thisId = idx;
        });

        /*
         * 使用 thisId 變數將 scrollList 指定項目補上 class active
         * 同時清除掉同一層級並帶有 class active 之樣式
         */
        scrollList.eq(thisId).addClass('active').siblings('.active').removeClass('active');
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