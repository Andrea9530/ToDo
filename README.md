# ToDo

> A simple to-do app that lets you create multiple lists cantaining items that support title, description and a due date.

# Screenshots
![image](assets/be577d28-6dbd-4126-a4e4-9c62fc0c434f.jpg)
![image](assets/8fd1c36e-eb80-4cf3-a7c0-dcd1dd782c9c.jpg)
![image](assets/0d09c3c2-7af0-4e3c-9cae-038149a28540.jpg)
![image](assets/431ee964-f4b8-4ba0-97c4-8ba8e4a647ac.jpg)

## Features

- **Multilanguage** - Currently supports: English, Italian
- **Ligh/Dark Themes** - Supports light, dark and automatic (based on device theme) theme options
- **Instant update** - The theme and language update instantly when changed, no need to restart the app
- **Storage** - The data is stored locally

## Development environment

The app has been tested using:
- [React Native](https://reactnative.dev/) (0.76.7)
- [Node.js](https://nodejs.org/) (22.14.0)
- [npm](https://www.npmjs.com/) (10.9.2)
- [React Native Community CLI](https://github.com/react-native-community/cli) (15.0.1)
- Phone running Android 15

⚠️ The app has not been tested on iOS devices

## Installation

```bash
# Clone the repository
git clone https://github.com/Andrea9530/ToDo.git

# Navigate to the project directory
cd ToDo

# Install dependencies
npm install

cd android && ./gradlew clean

cd ..
```

## Running the App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android
```

## Build and Deployment

### Android

```bash
# Generate release APK
cd android && ./gradlew clean && ./gradlew assembleRelease
```
You will find the APK at: android/app/build/outputs/apk/release/app-release.apk

