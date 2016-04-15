/*
Copyright (C) 2015, MuChu Hsu
Contributed by Muchu Hsu (muchu1983@gmail.com)
This file is part of BSD license

<https://opensource.org/licenses/BSD-3-Clause>
*/
(function($) {
    /* 內容畫面高度設定 */
    function ScaleContentToDevice(){
        scroll(0, 0);
        var content = $.mobile.getScreenHeight() - $(".ui-header").outerHeight() - $(".ui-footer").outerHeight() - $(".ui-content").outerHeight() + $(".ui-content").height();
        $(".ui-content").height(content);
    }
    /* 調整內容畫面高度 - pagecontainershow */
    $(document).on("pagecontainershow", function(){
        ScaleContentToDevice();        
    });
    /* 調整內容畫面高度 - resize orientationchange */
    $(window).on("resize orientationchange", function(){
        ScaleContentToDevice();
    });

    
    $(document).ready(function(){
        
        
    });
})(jQuery);