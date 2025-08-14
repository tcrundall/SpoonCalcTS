# notes

Collection of notes related to development, testing and deployment of spoon calculator built with
react native.

## links

- [creating a react app](https://react.dev/learn/creating-a-react-app)
- [get started with react native](https://reactnative.dev/docs/environment-setup)

## create a new app

`npx create-expo-app@latest`

## start app

```bash
npm run android # needs Andoird SDK to be installed
npm run ios
npm run web
```

Using expo go, one can easily test a sandbox version on native device.

Install "Expo Go" app

## troubeshooting

Running basic created expo app hits an error "javaio.IOException: Failed to download remote update"

**SOLVED:** run with `npx expo start --tunnel`
- see [here](https://docs.expo.dev/get-started/start-developing/)
