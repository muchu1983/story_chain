# -*- coding: utf-8 -*-
"""
Copyright (C) 2015, MuChu Hsu
Contributed by Muchu Hsu (muchu1983@gmail.com)
This file is part of BSD license

<https://opensource.org/licenses/BSD-3-Clause>
"""
from flask import Flask
from flask import request
from flask import render_template
app = Flask(__name__)

@app.route("/hello/<username>/<int:num>", methods=["GET", "POST"])
def hello(username, num):
    #http://192.168.1.101:5000/hello/muchu/7?love=lunna
    request.form #get form data when POST
    return "Hello World! %s %d method: %s args: %s"%(username, num, 
                                                     request.method, request.args.get("love"))
    
@app.route("/temp/")
@app.route("/temp/<name>")
def temp(name=None):
    return render_template("temp.html", name=name)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
    