#!/bin/bash

echo 'Set Bundle ID to com.microsoft.mobilecenter.testerapp.df'
/usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier com.microsoft.mobilecenter.testerapp.df" iOS/Info.plist
