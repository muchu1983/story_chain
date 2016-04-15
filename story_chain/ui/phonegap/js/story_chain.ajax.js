/*
Copyright (C) 2015, MuChu Hsu
Contributed by Muchu Hsu (muchu1983@gmail.com)
This file is part of BSD license

<https://opensource.org/licenses/BSD-3-Clause>
*/
(function($){
    
    function call_jsonp_api(api_url, json_data, success_callback){
        $.ajax({url: api_url,
            data: json_data,
            success: success_callback,
            dataType: "jsonp",
            jsonp: "strJsonpCallback",
            crossDomain: true
        });
    }
    
    /*範例*/
    $(document).ready(function(){
        var api_url = "http://192.168.1.101:5000/jsonpapi";
        var json_data = {x:"555", y:"333"};
        $("#exit_btn").click(function(){
            call_jsonp_api(api_url, json_data, function(response){
                $("#jsonpapi_result").text(response.result);
            });
        });
    });
    
})(jQuery);