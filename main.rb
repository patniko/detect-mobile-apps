#!/usr/local/bin/ruby -w

require 'optparse'
require_relative 'scanner'

options = {}
OptionParser.new do |parser|
  parser.on("-f", "--folder LIBRARY",
            "Folder you would like to scan") do |folder|

    scanner = Scanner.new folder
    projects = scanner.scan

    puts projects
    puts "#{projects.length} mobile project(s) found." 
  end
end.parse!
