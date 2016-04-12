# -*- coding: utf-8 -*-
"""
Copyright (C) 2015, MuChu Hsu
Contributed by Muchu Hsu (muchu1983@gmail.com)
This file is part of BSD license

<https://opensource.org/licenses/BSD-3-Clause>
"""
import unittest
import logging
from story_chain import flaskrunner

"""
測試 FlaskRunner
"""

class FlaskRunnerTest(unittest.TestCase):

    #準備
    def setUp(self):
        logging.basicConfig(level=logging.INFO)
        pass
        
    #收尾
    def tearDown(self):
        pass

    #測試 啟動 flask server
    def test_start_flask_server(self):
        logging.info("FlaskRunnerTest.test_start_flask_server")
        flaskrunner.start_flask_server()

#測試開始
if __name__ == "__main__":
    unittest.main(exit=False)


