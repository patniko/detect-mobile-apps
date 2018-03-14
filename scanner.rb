
require 'json'
require_relative 'logging'
require_relative 'detection/ios'
require_relative 'detection/android'
require_relative 'detection/reactnative'
require_relative 'detection/xamarin'

class Scanner
  include Logging

  def initialize(path)
    @path = path
    @scanners = [IOS, Android, ReactNative, Xamarin]
  end

  def scan
    results = []

    logger.debug "Scanning #{@path}"
    @scanners.each do |scanner|
      projects = scanner.scan(@path)
      results.push(*projects)
    end

    return results
  end
end