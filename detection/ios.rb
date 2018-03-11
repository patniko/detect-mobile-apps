require 'json'
require_relative '../logging'

class IOS 
  extend Logging

  def self.scan(path)

    # Every project must have an xcode project
    projects = Dir.glob("#{path}/**/*.xcodeproj")
    logger.info "#{projects.length} XCode projects found"

    #projects.each { |project| puts project }

    # Every project must have at least one scheme matching (iOS, tvOS, watchOS)
    schemes = Dir.glob("#{path}/**/*.xcodeproj/xcshareddata/xcschemes/*")
    logger.info "#{schemes.length} project schemes found"
  end
end