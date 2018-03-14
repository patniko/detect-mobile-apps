
require 'json'
require_relative '../logging'

class Android 
  extend Logging

  def self.scan(path)
    # Every project must have an Android manifest
    manifests = Dir.glob("#{path}/**/AndroidManifest.xml")

    # Filter out nonsense
    manifests = manifests.select do |manifest|
      !manifest.include? "build/intermediates"
    end

    logger.debug "#{manifests.length} Android manifests found"

    results = []
    manifests.each do |manifest_path|
      logger.debug "Processing #{manifest_path}"

      # Must have a package name in the manifest
      manifest = Nokogiri::XML File.open manifest_path
      package_name = manifest.at_xpath("//manifest/@package")
      logger.debug "Package name: #{package_name}"

      config = AndroidConfiguration.new("android", manifest, package_name)
      results << config
    end
    return results
  end
end

class AndroidConfiguration
  def initialize(type, manifest, package_name)
    @type = type
    @manifest = manifest
    @package_name = package_name
  end
end