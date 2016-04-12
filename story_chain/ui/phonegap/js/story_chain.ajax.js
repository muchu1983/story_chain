/*
Copyright (C) 2015, MuChu Hsu
Contributed by Muchu Hsu (muchu1983@gmail.com)
This file is part of BSD license

<https://opensource.org/licenses/BSD-3-Clause>
*/
(function($){
    $(document).ready(function(){
        $("#exit_btn").click(function(){
            $.ajax({url: "http://192.168.1.101:5000/jsonpapi",
                    data: {x:"999", y:"999"},
                    success: function(response){
                        $("#jsonapi_result").text(response.result);
                    },
                    dataType: "jsonp",
                    jsonp: "strJsonpCallback",
                    crossDomain: true
            });
        });
    });
})(jQuery);