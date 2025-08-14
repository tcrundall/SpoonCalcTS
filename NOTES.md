# notes

Collection of notes related to development, testing and deployment of spoon calculator built with
react native.

## waiting for

- [ ] manual build

## actions

- [x] set up basic screen
- [x] test manual build
- [x] test manual install
- [ ] set up database
- [ ] set up import/export of data
- [ ] add activity logger screen
- [ ] add log summary screen
- [ ] add plot screen
- [ ] add symptoms tracker screen

## notes

### links

- [react quickstart](https://react.dev/learn)
    - [creating a react app](https://react.dev/learn/creating-a-react-app)
    - [react native library directory](https://reactnative.directory/)
- [react native docs](https://reactnative.dev/docs/getting-started)
    - [react native package library](https://reactnative.directory/)
    - [get started with react native](https://reactnative.dev/docs/environment-setup)
- [expo builds](https://expo.dev/accounts/tcrundall/projects/spoon-calculator/builds)
    - [sqlite with expo](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [typescript handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

### create a new app

`npx create-expo-app@latest`

### start app

```bash
npm run android # needs Andoird SDK to be installed
npm run ios
npm run web
```

Using expo go, one can easily test a sandbox version on native device.

Install "Expo Go" app

### building app

- [create a build](https://docs.expo.dev/develop/development-builds/create-a-build/)
- [bundletool docs](https://developer.android.com/tools/bundletool#generate-sdk-archive-from-sdk-bundle)
- [stack overflow post](https://stackoverflow.com/questions/50419286/install-android-app-bundle-on-device)
- [getting keys from expo](https://docs.expo.dev/app-signing/app-credentials/)

1. Sign up for an Expo account
2. Install dev client (unsure if this is required):
    ```bash
    npx expo install expo-dev-client
    ```
3. Install CLI and log in
    ```bash
    npm install -g eas-cli && eas login
    ```
4. Build
    ```bash
    eas build --platform android --profile development
    ```

But... app seems to need a "development server". Neat for debugging. But not what I want for long
term use.

Building a non-dev version (production) yields an `.aab` file, which cannot directly be installed on
a device. See [stack overflow post](https://stackoverflow.com/questions/50419286/install-android-app-bundle-on-device).

So I build with
```bash
eas build --platform android
# produces a .aab file
# which I download

bundletool build-apks --bundle=spoon-calc-2025-08-14T17-19.aab --output=spoon-calc-2025-08-14T17-19.apks
```

But `apks` doesn't seem to be simply installable on my device.
Maybe I need to sign it?
But I don't have a local key.

Can get key with:
```bash
eas credentials
```
And then select Android > {Build profile} > Manage Credentials(?) > download to local(?)

For convenience you can convert the resulting json file into a sourceable env file to dump keys into
your environment:
```bash
export KEYSTOREPATH="credentials/android/keystore.jks"
export KEYSTOREPASSWORD="pass:<password>"
export KEYALIAS="alias"
export KEYPASSWORD="pass:<password>"
```

> *Note the preceeding `pass:` which indicates passwords are provided as text and not filepaths*

### setting up sqlite

Using `expo-sqlite`

### troubeshooting

Running basic created expo app hits an error "javaio.IOException: Failed to download remote update"

**SOLVED:** run with `npx expo start --tunnel`
- see [here](https://docs.expo.dev/get-started/start-developing/)

When building, generating keystore in the cdloud failed (500). It worked upon retry.
