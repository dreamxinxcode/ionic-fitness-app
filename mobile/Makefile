install:
	npm i

run:
	ng serve

run_android:
	ionic build
	npx cap sync android
	npx cap open android


build_android:
	export CAPACITOR_ANDROID_STUDIO_PATH=/usr/bin/android-studio
	ionic capacitor resources
	ionic capacitor sync
	npx cap copy android
	npx cap open android
	ionic capacitor build android
	# In Android Studio - Build > Build Bundle(s) / APK(s) > Build APK(s)