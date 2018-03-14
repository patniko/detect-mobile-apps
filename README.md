## Setup

```
gem install json
gem install nokogiri
gem install xcodeproj
```

## Detection
Checks for iOS, Android, React Native and Xamarin projects.

### iOS Swift/Objective-C
1. Must have .xcodeproj
2. Must have a build configuration
3. Must have info.plist file
4. Must contain bundle identifier in info.plist file

### Android
1. Must have AndroidManifest.xml
2. Must have a package name in the manifest

### React Native
1. Must have a packave.json file
2. Must include react-native as a core dependency

### Xamarin
1. Must have a *.csproj, *.fsproj or *.sln file
2. Must contain `{EFBA0AD7-5A72-4C68-AF49-83D382785DCF}` for Android projects
2. Must contain `{FEACFBD2-3405-455C-9665-78FE426C6842}` for iOS projects
