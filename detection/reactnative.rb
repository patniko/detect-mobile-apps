
require 'json'
require_relative '../logging'

class ReactNative 
  extend Logging

  def self.scan(path)
    # Must have a package.json file
    package_jsons = Dir.glob("#{path}/**/package.json")
    logger.debug "#{package_jsons.length} package.json files found"

    results = []
    package_jsons.each do |package_json_path|
      file = File.read(package_json_path)
      packageHash = JSON.parse(file)

      # Must use react-native npm package
      package_name = packageHash['name']
      dependencies = packageHash['dependencies']
      rn_version = dependencies['react-native']

      if rn_version then
        configuration = ReactNativeConfiguration.new("reactnative", package_json_path, package_name, rn_version)
        results << configuration
      end
    end
    return results
  end
end

class ReactNativeConfiguration
  def initialize(type, package_json, package_name, rn_version)
    @type = type
    @package_json = package_json
    @package_name = package_name
    @rn_version = rn_version
  end
end