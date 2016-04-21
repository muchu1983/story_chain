/*
Copyright (C) 2015, MuChu Hsu
Contributed by Muchu Hsu (muchu1983@gmail.com)
This file is part of BSD license

<https://opensource.org/licenses/BSD-3-Clause>
*/
(function($) {
    /* 內容畫面寬高設定 */
    function ScaleContentToDevice(){
        scroll(0, 0);
        var contentHeight = $(window).height() - $(".ui-header").outerHeight() - $(".ui-footer").outerHeight() - $(".ui-content").outerHeight() + $(".ui-content").height();
        var contentWidth = $(window).width() - $(".ui-content").outerWidth() + $(".ui-content").width();
        $(".ui-content").height(contentHeight);
        $(".ui-content").width(contentWidth);
    }
    /* 調整內容畫面寬高 - pagecontainershow*/
    $(document).on("pagecontainershow", function(){
        ScaleContentToDevice();        
    });
    /* 調整內容畫面寬高 - resize orientationchange */
    $(window).on("resize orientationchange", function(){
        ScaleContentToDevice();
    });
    /* html 完成載入 */
    $(document).ready(function(){
        /*jquery-te editor*/
        $(".te_editor").jqte({
            source: false,
            remove: false,
            sub: false,
            sup: false,
            ol: false,
            ul: false,
            unlink: false,
            link: false,
            strike: false,
            format: false
        });
    });
    
})(jQuery);