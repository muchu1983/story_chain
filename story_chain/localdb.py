# -*- coding: utf-8 -*-
"""
Copyright (C) 2015, MuChu Hsu
Contributed by Muchu Hsu (muchu1983@gmail.com)
This file is part of BSD license

<https://opensource.org/licenses/BSD-3-Clause>
"""
from bennu.localdb import SQLite3Db
"""
本地端資料庫存取
"""
class LocalDbForStoryChain:
    
    #建構子
    def __init__(self):
        self.db = SQLite3Db(strResFolderPath="story_chain_res")
        self.initialDb()
        
    #初取化資料庫
    def initialDb(self):
        strSQLCreateTable = ("CREATE TABLE IF NOT EXISTS story_chain_story("
                             "intId INTEGER PRIMARY KEY,"
                             "strContent TEXT NOT NULL,"
                             "intLike INTEGER NOT NULL,"
                             "intDislike INTEGER NOT NULL)")
        self.db.commitSQL(strSQL=strSQLCreateTable)
        strSQLCreateTable = ("CREATE TABLE IF NOT EXISTS story_chain_chain("
                             "intId INTEGER PRIMARY KEY,"
                             "intNextId INTEGER,"
                             "intStoryId INTEGER NOT NULL,"
                             "intPrevId INTEGER NOT NULL)")
        self.db.commitSQL(strSQL=strSQLCreateTable)
        strSQLCreateTable = ("CREATE TABLE IF NOT EXISTS story_chain_tag("
                             "id INTEGER PRIMARY KEY,"
                             "strTagName TEXT NOT NULL,"
                             "intStoryId INTEGER NOT NULL,"
                             "numTimeLimit DATE NOT NULL)")
        self.db.commitSQL(strSQL=strSQLCreateTable)
        