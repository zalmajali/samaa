import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.samaabdountowers.com',
  appName: 'سما عبدون',
  webDir: 'www',
  "plugins": {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    "CapacitorFirebaseConfig": {
      "android": {
        "googleServicesFile": "./android/app/google-services.json"
      },
      "ios": {
        "googleServicesFile": "./ios/App/GoogleService-Info.plist"
      }
    }
  }
};

export default config;
