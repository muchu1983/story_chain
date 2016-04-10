# -*- coding: utf-8 -*-
"""
Copyright (C) 2015, MuChu Hsu
Contributed by Muchu Hsu (muchu1983@gmail.com)
This file is part of BSD license

<https://opensource.org/licenses/BSD-3-Clause>
"""
from setuptools import setup,find_packages

with open("README.txt") as file:
    long_description = file.read()

setup(
    name = "story_chain",
    version = "0.0.1.dev1",
    keywords = ["bennu", "story", "muchu", "chain"],
    description = "story chaining phone app",
    author = "MuChu Hsu",
    author_email = "muchu1983@gmail.com",
    license = "BSD 3-Clause License",
    url="https://github.com/muchu1983/story_chain",
    long_description=long_description,
    packages = find_packages(),
    include_package_data = True,
    install_requires = ["bennu>=0.3.1.dev13"],
    platforms = "python 3.3",
    entry_points = {"console_scripts":["story_chain=story_chain.launcher:entry_point"]},
    classifiers = [
        "Development Status :: 3 - Alpha",
        "Environment :: Win32 (MS Windows)",
        "Environment :: X11 Applications :: GTK",
        "Intended Audience :: End Users/Desktop",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: BSD License",
        "Natural Language :: Chinese (Traditional)",
        "Natural Language :: Chinese (Simplified)",
        "Natural Language :: English",
        "Operating System :: Microsoft :: Windows",
        "Operating System :: POSIX :: Linux",
        "Programming Language :: Python :: 3.3",
        "Topic :: Internet :: WWW/HTTP",
        ],
)



