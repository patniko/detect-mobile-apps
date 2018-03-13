Setup

`gem install json`

Detection

React Native
	1. Locate package.json
		a. Find usage of react-native.
		b. Determine if ejected or unejected RN app
		c. Locate expo (.expo folder?)

iOS Swift/Objective-C
	1. Locate .xcodeproj

Android Java/Kotlin
	1. Locate AndroidManifest.xml
	<manifest xmlns:android="http://schemas.android.com/apk/res/android" ... >
	    <uses-sdk android:minSdkVersion="4" android:targetSdkVersion="15" />
	    ...
	</manifest>


Xamarin
	1. 



Will the add repo option to filter mobile
Ruby file run by Dennis -
Can we get information passed over to us regarding detection
Is there an easy way for people to get back to App Center from Github



main
-> processor.run();
    -> react native
       -> scan()
    -> ios
       -> scan()
    -> android
       -> scan()
    -> xamarin
       -> scan()