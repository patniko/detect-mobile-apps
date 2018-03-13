
require 'json'
require_relative '../logging'

class Xamarin 
  extend Logging

  @XAMARIN_ANDROID_GUID = "{EFBA0AD7-5A72-4C68-AF49-83D382785DCF}";
  @XAMARIN_IOS_GUID = "{FEACFBD2-3405-455C-9665-78FE426C6842}";

  def self.scan(path)

    android_projects = find(@XAMARIN_ANDROID_GUID, path)
    ios_projects = find(@XAMARIN_IOS_GUID, path)

    # Must have csproj containing Xamarin Android or iOS project guid
    projects << find(needle, XAMARIN_IOS_GUID)
    projects << find(needle, XAMARIN_ANDROID_GUID) 
    puts projects
  end

  def find(needle, path) 
    count = `find #{path} -name "*.csproj" -o -name '*.fsproj' -o -name '*.sln' | xargs grep -il "#{needle}" | wc -l`
    return count
  end
end

