#!/usr/local/bin/ruby -w

require 'optparse'
require_relative 'scanner'

options = {}
OptionParser.new do |parser|
  parser.on("-f", "--folder LIBRARY",
            "Folder you would like to scan") do |folder|

    scanner = Scanner.new folder
    scanner.scan
  end
end.parse!
