
require 'json'
require_relative '../logging'

class Android 
  extend Logging

  def self.scan(path)
    # Every project must have an Android manifest
    manifests = Dir.glob("#{path}/**/AndroidManifest.xml")

    # Filters for user error
    manifests = manifests.select do |manifest|
      !manifest.include? "build/intermediates"
    end

    logger.info "#{manifests.length} Android manifests found"
    manifests.each do |manifest|
      logger.info "Processing #{manifest}"
    end
  end
end