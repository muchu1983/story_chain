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
    
#在指定的段落之後 加入新的故事段落 (return 新段落 id)
@app.route("/story_chain/api/story", methods=["POST"])
def apiPostNewStory():
    request.args.get("intStoryId")
    pass
    
#取得指定段落內容
@app.route("/story_chain/api/story/<int:intStoryId>", methods=["GET"])
def apiGetStoryById(intStoryId=0):
    pass
    
#修改指定段落內容 (按贊/按噓)
@app.route("/story_chain/api/story/<int:intStoryId>", methods=["PUT"])
def apiPutStoryById(intStoryId=0):
    pass
    
#取得 前 or 後 故事段 列表 (return 段落 id list)
@app.route("/story_chain/api/story", methods=["GET"])
def apiGetStoryList():
    request.args.get("strType") #"next" or "prev"
    request.args.get("intStoryId")
    pass
    
#讀取書籤
@app.route("/story_chain/api/tag/<strTagName>", methods=["GET"])
def apiGetTagByName(strTagName=None):
    pass
    

#新增書籤 (書籤有時限)
@app.route("/story_chain/api/tag", methods=["POST"])
def apiPostTag(strTagName=None):
    request.args.get("strTagName")
    request.args.get("intStoryId")
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
def jsonpapi():
    strCallback = request.args.get("strJsonpCallback", 0, type=str)
    x = request.args.get("x", 0, type=int)
    y = request.args.get("y", 0, type=int)
    dicResultJson = {"result":x+y}
    return strCallback + "(" + json.dumps(dicResultJson) + ")"
    
if __name__ == "__main__":
    start_flask_server()