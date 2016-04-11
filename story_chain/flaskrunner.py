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
    return "Hello World! %s %d method: %s"%(username, num, request.method)
    
@app.route("/temp/")
@app.route("/temp/<name>")
def temp(name=None):
    return render_template("temp.html", name=name)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
    