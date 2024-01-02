# Notes

## Challenges

### Editable activity

#### Goal

Edit an activity.

On press of an activity in log, open a screen/view with all
activity info currently loaded, and allow for modifications
to be committed to database upon confirmation.

#### Approach 1

Switch to activity screen with all states preloaded.

Pros: utilize all existing buttons

Known Unknowns:

- [x] how to set all values from external
- [ ] customize behavior based on from whence we came

## Processes

### Building APK

Follow [instructions laid out by expo](https://docs.expo.dev/build-reference/apk/).
Once `eas.json` has been modified approrpiately, trigger build with:
```bash
  eas build -p android --profile preview
```
