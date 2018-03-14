
require 'json'
require_relative '../logging'

class Xamarin 
  extend Logging

  @XAMARIN_ANDROID_GUID = "{EFBA0AD7-5A72-4C68-AF49-83D382785DCF}";
  @XAMARIN_IOS_GUID = "{FEACFBD2-3405-455C-9665-78FE426C6842}";

  def self.scan(path)
    results = []

    # Must have csproj containing Xamarin Android or iOS project guid
    android_projects = find(@XAMARIN_ANDROID_GUID, path)
    results.push(*self.analyze(android_projects, "android"))

    ios_projects = find(@XAMARIN_IOS_GUID, path)
    results.push(*self.analyze(ios_projects, "ios"))

    return results
  end

  def self.find(needle, path) 
    projects = `find #{path} -name "*.csproj" -o -name '*.fsproj' -o -name '*.sln' | xargs grep -il "#{needle}"`.split(/\n/)
    return projects
  end

  def self.analyze(project_files, target_os)
    projects = [] 
    project_files.each do |project_file|
      configuration = XamarinConfiguration.new("Xamarin", project_file, target_os)
      projects << configuration
    end
    return projects
  end
end

class XamarinConfiguration
  def initialize(type, project_file, target_os)
    @type = type
    @project_file = project_file
    @target_os = target_os
  end
end

