# -*- coding: utf-8 -*-
"""
Copyright (C) 2015, MuChu Hsu
Contributed by Muchu Hsu (muchu1983@gmail.com)
This file is part of BSD license

<https://opensource.org/licenses/BSD-3-Clause>
"""
import json
from flask import Flask
from flask import request
from flask import render_template
from flask import jsonify

app = Flask(__name__.split(".")[0])

#啟動 server
def start_flask_server():
    app.run(host="0.0.0.0", port=5000, debug=True)
    
#取得故事段落 
@app.route("/story_chain/api/story/<int:intStoryId>", methods=["GET"])
def apiGetStoryById(intStoryId):
    pass
    
#在指定的段落後 新增故事段落 (return 新段落 id)
@app.route("/story_chain/api/story/<int:intStoryId>", methods=["POST"])
def apiCreateStoryNextTo(intStoryId):
    pass
    
#取得下一段故事列表 (return 段落 id list)
@app.route("/story_chain/api/story/next/<int:intStoryId>", methods=["GET"])
def apiListNextStoryId(intStoryId):
    pass
    
#取得上一段故事 (return 段落 id)
@app.route("/story_chain/api/story/prev/<int:intStoryId>", methods=["GET"])
def apiGetPrevStoryId(intStoryId):
    pass

#= Flask 範例 =
#GET POST參數範例
@app.route("/hello/<username>/<int:num>", methods=["GET", "POST"])
def hello(username, num):
    #http://192.168.1.101:5000/hello/muchu/7?love=lunna
    request.form #get form data when POST
    return "Hello World! %s %d method: %s args: %s"%(username, num, 
                                                     request.method, request.args.get("love"))
    
#template範例
@app.route("/template/")
@app.route("/template/<name>")
def template(name=None):
    return render_template("temp.html", name=name)
    
#post json範例
@app.route("/jsonpapi", methods=["POST", "GET"])
def jsonapi():
    strCallback = request.args.get("strJsonpCallback", 0, type=str)
    x = request.args.get("x", 0, type=int)
    y = request.args.get("y", 0, type=int)
    dicResultJson = {"result":x+y}
    return strCallback + "(" + json.dumps(dicResultJson) + ")"
    
if __name__ == "__main__":
    start_flask_server()