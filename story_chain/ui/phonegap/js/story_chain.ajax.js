/*
Copyright (C) 2015, MuChu Hsu
Contributed by Muchu Hsu (muchu1983@gmail.com)
This file is part of BSD license

<https://opensource.org/licenses/BSD-3-Clause>
*/
(function($){
    //var strApiServerDomain = "http://bennu.ddns.net:5000"; //deploy
    var strApiServerDomain = "http://127.0.0.1:5000"; //test
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
        /* 新的故事 */
        $("#btn_create_first_story").click(function(){ //按下 新的故事
            intCurrentStoryId = 0;
            $("#textarea_new_story_content").jqteVal("") //清空 editor
        });
        /* 編輯故事 完成 */
        $("#btn_edit_ok").click(function(){ 
            var intPrevStoryId = intCurrentStoryId;
            var strStoryContent = $("#textarea_new_story_content").val();
            // ajax api /story_chain/api_post/story
            var api_url = strApiServerDomain + "/story_chain/api_post/story";
            var json_data = {int_prev_story_id : intPrevStoryId,
                             str_story_content : strStoryContent};
            call_jsonp_api(api_url, json_data, function(response){
                intCurrentStoryId = response.new_story_id;
                $("#popup_story_create_okay").popup("open");
                $("#popup_story_create_okay #btn_okay").click(function(){
                    // 切換至閱讀頁
                    $("body").pagecontainer("change", "#read_story_page", {});
                });
            });
        });
        /* 編輯故事 取消 */
        $("#btn_edit_cancel").click(function(){ 
            if (intCurrentStoryId == 0){
                // 切換至首頁
                $("body").pagecontainer("change", "#start_page", {});
            }else{
                // 切換至閱讀頁
                $("body").pagecontainer("change", "#read_story_page", {});
            };
        });
        /* 顯示閱讀頁 */
        $(document).on("pagecontainershow", function(e, ui) {
            var pageId = $("body").pagecontainer("getActivePage").prop("id");
            if (pageId == "read_story_page"){
                // ajax api /story_chain/api_get/story/<int:intStoryId>
                var api_url = strApiServerDomain + "/story_chain/api_get/story/" + intCurrentStoryId;
                call_jsonp_api(api_url, {}, function(response){
                    $("span#like_count").text(response.int_like)
                    $("span#dislike_count").text(response.int_dislike)
                    $("#current_story_content").jqteVal(response.str_content)
                });
            };
        });
        /*前一段*/
        $("#btn_prev_story").click(function(){
            // ajax api /story_chain/api_get/story
            var api_url = strApiServerDomain + "/story_chain/api_get/story";
            var json_data = {str_type: "prev", int_story_id: intCurrentStoryId};
            call_jsonp_api(api_url, json_data, function(response){
                if(response.str_prev_story_id == null){
                    // 已是故事的開頭
                    $("#popup_prev_story_not_exists").popup("open");
                }else{
                    // 已取得前一段落 id
                    intCurrentStoryId = response.str_prev_story_id;
                    // 切換至閱讀頁
                    $("body").pagecontainer("change", "#read_story_page", {});
                };
            });
        });
        /*接寫新段落*/
        
        /*下一段*/
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