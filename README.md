# dr-play
A media browser for danish state radio and televsion, using http://dr.dk/mu REST API

DR-Play's main purpose is to be faster than DR TV's existing app, by being a lot simpler, and only providing the most needed features of the api, and to be working on Android TV and LG TV's.

Cordova is used to deploy on multiple platforms.

Trello Board:
https://trello.com/b/MR8NZW2J

Getting Started:
- Get Node https://nodejs.org/en/
- Fork this project
- `git clone https://github.com/firecow/dr-play.git`
- `cd dr-play`
- `npm install`
- `npm run webserver -- -p 8081`
- Open http://localhost:8081 in a browser


You can see the app running here http://tv.firecow.dk

## webOs 3.5
Packing and installing on device:
- Open webOS CLI
- Navigate to the folder containing the project
- Setup device with: `ares-setup-device`
- Create IPK with: `ares-package ./cow-tv`
- Install to device with: `ares-install --device [name_of_device] [path_to_ipk]` 
ie. `ares-install --device emulator ./dk.rocha.dr-tv-player_0.0.1_all.ipk`
