
require 'json'
require_relative 'logging'
require_relative 'detection/ios'
require_relative 'detection/android'

class Scanner
  include Logging

  def initialize(folder)
    @path = folder
  end

  def scan

    logger.info "Scanning #{@path}"

    IOS.scan @path
    Android.scan @path
    
  end
end