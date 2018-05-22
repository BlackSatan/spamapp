## Installation Guide

# Emulator
1. Install Android Studio
2. Create Empty Project
3. Open AVD Manager
4. Create Emulator (My option is Google Pixel with API 26)
5. Run it

#App

1. Clone project
2. Open Terminal
3. In this directory run `npm i`, then `npm start`
4. `npm i -g react-native`
5. Start app with `react-native run-android` 

# Remarks

For now app showing both inbox and sent sms in list for testing purposes (because it's easy to send sms from emulator,
but I didn't find a way to get it), if you need only inbox sms in list, then in src/reducers/sms/smsActions, change
filter box property to `box: 'inbox'`. 
