# -*- coding: utf-8 -*-
"""
Copyright (C) 2015, MuChu Hsu
Contributed by Muchu Hsu (muchu1983@gmail.com)
This file is part of BSD license

<https://opensource.org/licenses/BSD-3-Clause>
"""
import unittest
import logging
from story_chain.localdb import LocalDbForStoryChain
"""
測試 本地端資料庫存取
"""
class LocalDbTest(unittest.TestCase):

    #準備
    def setUp(self):
        logging.basicConfig(level=logging.INFO)
        
    #收尾
    def tearDown(self):
        pass

    #測試 story_chain 本地端資料庫存取
    def test_localdb_for_story_chain(self):
        logging.info("LocalDbTest.test_localdb_for_story_chain")
        db = LocalDbForStoryChain()
        db.insertNewStory(strContent="content for unit test") #1
        db.insertNewStory(strContent="content for unit test", intPrevId=1)#2
        db.insertNewStory(strContent="content for unit test", intPrevId=2)#3
        #0 -> #1 -> #2 -> #3
        print(db.fetchStoryById(intStoryId=1))
        db.updateStoryLikeOrDislike(intStoryId=1, isLike=True)
        print(db.fetchNextOrPrevStoryId(intStoryId=2, strFetchType="next"))

#測試開始
if __name__ == "__main__":
    unittest.main(exit=False)


