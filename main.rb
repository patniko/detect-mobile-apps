#!/usr/local/bin/ruby -w

require 'optparse'
require_relative 'detection/processor'

options = {}
OptionParser.new do |parser|
  parser.on("-f", "--folder LIBRARY",
            "Folder you would like to scan") do |folder|
    puts "Scanning #{folder} for mobile projects..."

    processor.scan(folder)
  end
end.parse!



