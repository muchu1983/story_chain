/*
Copyright (C) 2015, MuChu Hsu
Contributed by Muchu Hsu (muchu1983@gmail.com)
This file is part of BSD license

<https://opensource.org/licenses/BSD-3-Clause>
*/
(function($){
    
    /* 呼叫 story_chain JSONP API */
    function call_jsonp_api(api_url, json_data, success_callback){
        $.ajax({url: api_url,
            data: json_data,
            success: success_callback,
            dataType: "jsonp",
            jsonp: "strJsonpCallback",
            crossDomain: true
        });
    }
    
    /* html document ready */
    $(document).ready(function(){
        /*新的故事*/
        /*舊的回憶*/
        /*範例*/
        var api_url = "http://bennu.ddns.net:5000/jsonpapi";
        var json_data = {x:"555", y:"333"};
        $("#jsonpapi_result").click(function(){
            call_jsonp_api(api_url, json_data, function(response){
                $("#jsonpapi_result").text(response.result);
            });
        });
    });
    
})(jQuery);