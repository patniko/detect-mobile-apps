
require 'json'
require_relative 'logging'

class ReactNative 
  include Logging

  def self.scan(path)
    # Must have a package.json file
    manifests = Dir.glob("#{path}/**/package.json")

    # Filters for user error
    manifests = manifests.select do |manifest|
      !manifest.include? "build/intermediates"
    end

    logger.info "#{manifests.length} package.json files found"
    manifests.each do |manifest_path|

    end

    # Must use react-native npm package
    file = File.read('samples/package.json')
    packages = JSON.parse(file)
  end
end