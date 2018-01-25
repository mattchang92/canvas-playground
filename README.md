# Canvas Music Visualizer

A single page music visualizer app that connects with the Spotify API to play music samples from either a default or an authenticated user's playlists. Built solely with React, Redux and HTML5 canvas and deployed on AWS (S3, CloudFront, Route53 and AWS Certificate Manager).

## Deployed link

[Link](https://music.mattchang.ca/)

Tested on Chrome and Firefox on OS X. It has not been tested on Windows/Edge and there isn't as of yet support for the AudioContext web API on Safari.

## Todo List
- [x] Improve Firefox Performance
- [ ] Create a backend to store user details and session
- [ ] Refactor large components
- [ ] Rewrite models as ES6 classes
- [ ] Create context instances inside top level React component instead of being passed as initial props
