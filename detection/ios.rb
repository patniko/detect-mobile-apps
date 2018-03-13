require 'json'
require 'nokogiri'
require 'xcodeproj'
require_relative '../logging'

class IOS 
  extend Logging

  def self.scan path
    mobile = []

    # Must have an xcode project
    project_files = Dir.glob "#{path}/**/*.xcodeproj"
    logger.debug "#{project_files.length} XCode project(s) found"

    project_files.each do |project_file|
      project = self.analyze project_file
      mobile.push(*project)
    end

    return mobile
  end

  def self.analyze(project_file)
    results = []

    logger.debug "Analyzing #{project_file}"
    project = Xcodeproj::Project.open(project_file)
    project_path = File.dirname project_file
  
    # Must have targets
    project.targets.each do |target|

      # Must have build configurations
      target.build_configurations.each do |build_config|

        plist_file = build_config.build_settings["INFOPLIST_FILE"]
        plist_path = File.join(project_path, plist_file)

        name = target.name
        build_configuration = build_config.name
        plist = build_config.build_settings["INFOPLIST_FILE"]
        deployment_target = build_config.build_settings["IPHONEOS_DEPLOYMENT_TARGET"]

        # Must have bundle identifier
        plist = Nokogiri::XML File.open plist_path
        bundle_id = self.dict(plist, "CFBundleIdentifier")
        logger.debug "#{bundle_id}"

        if bundle_id then
          config = IosConfiguration.new("apple", project_file, name, build_configuration, deployment_target, bundle_id)
          results << config
        end
      end
    end
    return results
  end

  def self.dict(plist, name)
    node = plist.at_xpath("//dict/key[text()='#{name}']")
    return node.next.next.children.text
  end

end

class IosConfiguration
  def initialize(type, project_file, name, build_configuration, target, bundle_id)
    @type = type
    @project_file = project_file
    @name = name
    @build_configuration = build_configuration
    @target = target
    @bundle_id = bundle_id
  end
end
