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
    function callJsonpApi(strApiUrl, dicJsonData, funcCallback){
        $.ajax({url: strApiUrl,
            data: dicJsonData,
            success: funcCallback,
            dataType: "jsonp",
            jsonp: "strJsonpCallback",
            crossDomain: true
        });
    };
    
    /* 將 story id 選項，放入 段落選擇頁 */
    function putOptionToSelectStoryPage(lstIntNextStoryId){
        $("ul#ul_story_option_list").html(""); //empty ul
        for (i = 0; i < lstIntNextStoryId.length; i++) {
            var intNextStoryId = lstIntNextStoryId[i];
            var strOptionHtml = ["<li>",
                                    "<a class=\"story_option ui-btn ui-btn-icon-right ui-icon-carat-r\"",
                                       "href=\"javascript: void(0)\"", 
                                       "value=\"" + intNextStoryId + "\">",
                                            "ID: " + intNextStoryId,
                                    "</a>",
                                "</li>"].join("");
            $("ul#ul_story_option_list").append(strOptionHtml);
        };
    };
    
    /* html document ready */
    $(document).ready(function(){
        /* 好的開始 */
        $("#btn_begin_of_story").click(function(){ //按下 好的開始
            // ajax api /story_chain/api_get/story
            var strApiUrl = strApiServerDomain + "/story_chain/api_get/story";
            var dicJsonData = {str_type: "next", int_story_id: 0};
            callJsonpApi(strApiUrl, dicJsonData, function(response){
                var lstIntNextStoryId = response.lst_int_next_story_id;
                if(lstIntNextStoryId.length == 0){
                    // 沒有任何故事
                    $("#popup_begin_of_story_not_exists").popup("open");
                }else{
                    putOptionToSelectStoryPage(lstIntNextStoryId);
                    // 切換至段落選擇頁
                    $("body").pagecontainer("change", "#select_story_page", {});
                };
            });
        });
        /* 新的故事 */
        $("#btn_create_first_story").click(function(){ //按下 新的故事
            intCurrentStoryId = 0;
            $("#textarea_new_story_content").jqteVal(""); //清空 editor
        });
        /*查看前一段*/
        $("#btn_show_prev_story_content").click(function(){
            $("#popup_show_prev_story_content").html("")//empty popup
            if (intCurrentStoryId == 0){
                // 沒有前一段
                $("#popup_show_prev_story_content").html("<p>查無前一段落內容。</p>")
            }else{
                // 取得前一段落內容
                // ajax api /story_chain/api_get/story/<int:intStoryId>
                var strApiUrl = strApiServerDomain + "/story_chain/api_get/story/" + intCurrentStoryId;
                callJsonpApi(strApiUrl, {}, function(response){
                    $("#popup_show_prev_story_content").html(response.str_content);
                });
            };
            //show popup
            $("#popup_show_prev_story_content").popup("open");
        });
        /* 編輯故事 完成 */
        $("#btn_edit_ok").click(function(){
            var intPrevStoryId = intCurrentStoryId;
            var strStoryContent = $("#textarea_new_story_content").val();
            // ajax api /story_chain/api_post/story
            var strApiUrl = strApiServerDomain + "/story_chain/api_post/story";
            var dicJsonData = {int_prev_story_id : intPrevStoryId,
                             str_story_content : strStoryContent};
            callJsonpApi(strApiUrl, dicJsonData, function(response){
                intCurrentStoryId = response.new_story_id;
                //彈出確認 popup
                $("#popup_story_create_okay").popup("open");
            });
        });
        /* 確認 段落已新增 */
        $("#popup_story_create_okay #btn_okay").click(function(){
            // 切換至閱讀頁
            $("body").pagecontainer("change", "#read_story_page", {});
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
        /* 切換頁面 */
        $(document).on("pagecontainerchange", function(){
            var pageId = $("body").pagecontainer("getActivePage").prop("id");
            switch(pageId){
                case "read_story_page":
                    /* 切換至閱讀頁 */
                    // ajax api /story_chain/api_get/story/<int:intStoryId>
                    var strApiUrl = strApiServerDomain + "/story_chain/api_get/story/" + intCurrentStoryId;
                    callJsonpApi(strApiUrl, {}, function(response){
                        $("span#like_count").text(response.int_like);
                        $("span#dislike_count").text(response.int_dislike);
                        $("#current_story_content").html(response.str_content);
                        $("#current_story_id").html("ID: " + intCurrentStoryId);
                    });
                    break;
                case "select_story_page":
                    /*切換至段落選擇頁*/
                    $(".story_option").click(function(){// bind event
                        /*選擇了某個段落選項*/
                        var intSelectedStoryId = parseInt($(this).attr("value"));
                        intCurrentStoryId = intSelectedStoryId;
                        // unbind event
                        $(".story_option").unbind("click");
                        //切換至閱讀頁
                        $("body").pagecontainer("change", "#read_story_page", {});
                    });
                    break;
                default:
                    break;
            };
        });
        /*前一段*/
        $("#btn_prev_story").click(function(){
            // ajax api /story_chain/api_get/story
            var strApiUrl = strApiServerDomain + "/story_chain/api_get/story";
            var dicJsonData = {str_type: "prev", int_story_id: intCurrentStoryId};
            callJsonpApi(strApiUrl, dicJsonData, function(response){
                if(response.int_prev_story_id == 0){
                    // 已是故事的開頭
                    $("#popup_prev_story_not_exists").popup("open");
                }else{
                    // 已取得前一段落 id
                    intCurrentStoryId = response.int_prev_story_id;
                    // 切換至閱讀頁
                    $("body").pagecontainer("change", "#read_story_page", {});
                };
            });
        });
        /*接寫新段落*/
        $("#btn_create_next_story").click(function(){
            // 清空 editor
            $("#textarea_new_story_content").jqteVal("");
        });
        /*下一段*/
        $("#btn_next_story").click(function(){
            // ajax api /story_chain/api_get/story
            var strApiUrl = strApiServerDomain + "/story_chain/api_get/story";
            var dicJsonData = {str_type: "next", int_story_id: intCurrentStoryId};
            callJsonpApi(strApiUrl, dicJsonData, function(response){
                var lstIntNextStoryId = response.lst_int_next_story_id;
                if(lstIntNextStoryId.length == 0){
                    // 已沒有下一段故事
                    $("#popup_next_story_not_exists").popup("open");
                }else{
                    putOptionToSelectStoryPage(lstIntNextStoryId);
                    // 切換至段落選擇頁
                    $("body").pagecontainer("change", "#select_story_page", {});
                };
            });
        });
        /*舊的回憶*/
        /*範例*/
        var strApiUrl = strApiServerDomain + "/jsonpapi";
        var dicJsonData = {x:"555", y:"333"};
        $("#jsonpapi_result").click(function(){
            callJsonpApi(strApiUrl, dicJsonData, function(response){
                $("#jsonpapi_result").text(response.result);
            });
        });
    });
    
})(jQuery);