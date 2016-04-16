/*
Copyright (C) 2015, MuChu Hsu
Contributed by Muchu Hsu (muchu1983@gmail.com)
This file is part of BSD license

<https://opensource.org/licenses/BSD-3-Clause>
*/
(function($){
    var strApiServerDomain = "http://bennu.ddns.net:5000"; //deploy
    //var strApiServerDomain = "http://127.0.0.1:5000"; //test
    var intCurrentStoryId;
    
    /* 呼叫 story_chain JSONP API */
    function call_jsonp_api(api_url, json_data, success_callback){
        $.ajax({url: api_url,
            data: json_data,
            success: success_callback,
            dataType: "jsonp",
            jsonp: "strJsonpCallback",
            crossDomain: true
        });
    };
    
    /* html document ready */
    $(document).ready(function(){
        /*新的故事*/
        $("#btn_create_first_story").click(function(){ //按下 新的故事
            intCurrentStoryId = 0;
        });
        $("#btn_edit_ok").click(function(){ // 編輯 新的故事 完成
            var intPrevStoryId = intCurrentStoryId;
            var strStoryContent = $("#textarea_new_story_content").text();
            // ajax api /story_chain/api_post/story
            var api_url = strApiServerDomain + "/story_chain/api_post/story";
            var json_data = {int_prev_story_id : intPrevStoryId,
                             str_story_content : strStoryContent};
            call_jsonp_api(api_url, json_data, function(response){
                intCurrentStoryId = response.new_story_id;
                $("#popup_story_create_okay").popup("open");
                $("#popup_story_create_okay #btn_okay").click(function(){
                    $("body").pagecontainer("change", "#read_story_page", {});
                });
            });
        });
        /*顯示閱讀頁*/
        $(document).on("pagecontainershow", function(e, ui) {
            var pageId = $("body").pagecontainer("getActivePage").prop("id");
            if (pageId == "read_story_page"){
                // ajax api /story_chain/api_get/story/<int:intStoryId>
                var api_url = strApiServerDomain + "/story_chain/api_get/story/" + intCurrentStoryId;
                call_jsonp_api(api_url, {}, function(response){
                    $("span#like_count").text(response.int_like)
                    $("span#dislike_count").text(response.int_dislike)
                    $("div#current_story_content").text(response.str_content)
                });
            };
        });
        /*舊的回憶*/
        /*範例*/
        var api_url = strApiServerDomain + "/jsonpapi";
        var json_data = {x:"555", y:"333"};
        $("#jsonpapi_result").click(function(){
            call_jsonp_api(api_url, json_data, function(response){
                $("#jsonpapi_result").text(response.result);
            });
        });
    });
    
})(jQuery);