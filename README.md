# Canvas Music Visualizer

A simple music visualizer single page app to practice canvas, React and Redux utilizing the Spotify API. The code is compiled with Webpack and deployed on AWS S3 as a static page.

## Deployed link

[Link](http://canvas-playground.s3-website.ca-central-1.amazonaws.com/)

Only tested on Chrome and Firefox on OS X. Currently working on canvas performance issues on Firefox. It has not been tested on Windows/EDGE and there isn't as of yet support for the AudioContext web API on Safari.

## Todo List
- [ ] Improve Firefox Performance
- [ ] Disable audio for Safari to allow basic canvas functionality
- [ ] Refactor large components
- [ ] Rewrite models as ES6 classes
- [ ] Create context instances inside top level React component instead of being passed as initial props
