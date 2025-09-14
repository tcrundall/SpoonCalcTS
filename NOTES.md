# notes

Collection of notes related to development, testing and deployment of spoon calculator built with
react native.

## waiting for

- [x] manual build

## actions

### feature 0: fundamental infrastructure

- [x] set up basic screen
- [x] test manual build
- [x] test manual install
- [x] set up database

### feature 1: run in web

- [x] disable database for web development **◎**

### feature 10: set up activity database

- [x] decide contents
    - remember, no derived values
- [x] initialise table
- [x] add adder
- [x] add updater
- [x] add deleter
- [x] add unit tests

### feature 2: log activity

- [ ] add activity logger screen
- [ ] add log summary screen

### feature 3: plot spoons

- [ ] add plot screen

### feature 4: import from file

- [ ] set up import/export of data

### feature 5: log symptoms

- [ ] add symptoms tracker screen

### feature 6: log special events

### feature 7: centralized database with encryption

### feature 8: build and deploy

### feature 9: release to beta testers

### feature 11: add security

- [ ] sanitise input before creating SQL requests

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
npx expo start --go --clear
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

Using [`expo-sqlite`](https://docs.expo.dev/versions/latest/sdk/sqlite/)

Install:
```bash
npx expo install expo-sqlite
```

### setting up file picker

There is an [expo filesystem library](https://docs.expo.dev/versions/latest/sdk/filesystem/) but it
doesn't seem to give access to local files.

There is a [react native documents library](https://react-native-documents.github.io/docs/install)
which does provide access to local files.
However this does not work with Expo Go because they include custom native code.

### setting up virtual android

- [android studio docs](https://developer.android.com/studio/run/emulator#avd)
- [expo docs](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated)

1. open up virtual android via android studio
2. build app (see expo docs)
3. install to virtual android (see expo docs)
4. run with `npx expo start`
5. hit `a` to open on android (should auto detect the open virtual android)
6. changes are hot reloaded

### troubeshooting

#### Failed to download remote update

Running basic created expo app hits an error "javaio.IOException: Failed to download remote update"

**SOLVED:** run with `npx expo start --tunnel`
- see [here](https://docs.expo.dev/get-started/start-developing/)

#### cannot start on phone

Sometimes the app just won't start, no error, no exception.

Solution(?) seems to be starting app from repo at example checkout
`2df189cce52d4f73fe6a61273e046f64ec19ac28`, then reloading from current HEAD works...

Or maybe, ensuring "Expo Go" run, and refreshing the expo go app
`npx expo start --go`

#### sql formatting

Tried to get sqlfluff to format my SQL strings, however it could not parse the strings, and even
when it could parse, it didn't apply the kind of formatting/indenting I was hoping for.

#### ios
[react-native-paper ios instructions](https://callstack.github.io/react-native-paper/docs/guides/getting-started)
`npx pod-install`

#### misc

When building, generating keystore in the cdloud failed (500). It worked upon retry.
