
require 'json'
require_relative 'logging'


class ReactNative 
  include Logging

  def self.scan(path)
    # Will have a package.json file
    projects = Dir.glob("#{path}/**/package.json")

    # Must include react-native npm package
    file = File.read('samples/package.json')
    packages = JSON.parse(file)

  end
end