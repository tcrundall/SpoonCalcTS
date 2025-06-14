# TODO

## Framework

- [x] Basic screen navigation
- [x] Activity input screen
- [x] Basic home screen
  - [x] Icon
  - [x] Buttons at bottom
  - [x] Average spoons
- [x] Symptom input screen
- [x] Dummy data file (SKIPPED: old app not buildable, can't generate example file)
  - [x] sqlite?
  - [x] Can prepare data with python...?
- [x] Fix bug: button margins don't appear immediately

## Functionality

- [x] Refactor
  - [x] make components
  - [x] centralize styles
- [x] Data persistence
  - [Many options](https://taglineinfotech.com/react-native-database/)
    - [sqlite](https://www.npmjs.com/package/react-native-sqlite-storage)
  - [x] save activity
  - [x] save symptoms
  - [ ] refactor
    - [ ] Set buttons to enum-like values
    - [x] Add mappers for activites
    - [ ] Add database client
    - [x] Move date/time operations into module
    - [x] Use "activity" as state in activity screen
  - [x] Log display
    - [x] Show activities
    - [x] Filter for today
    - [x] Delete
      - [x] delete on press
      - [x] ask for confirmation
      - [x] auto-update
    - [x] Edit
    - [x] Show previous days
    - [x] Show current day date
- [x] Allow deselection of activity fields
- [x] Auto update after activity edit
- [ ] Activity plotting screen
- [x] Deploy
- [x] Install
- [ ] Fix Bugs
  - [ ] upon install, can't save any activities
    - [ ] install adb and check logs
    - [ ] check if issue with sqlite?

## Throw away and start again?

## Advanced

- [ ] Energy projections
- [ ] Mood tracking
- [ ] Event tracking
- [ ] Symptom correlation
- [ ] Advanced plotting

## Usable by others

- [ ] Authentication
- [ ] Dynamic symptom list
- [ ] App store
