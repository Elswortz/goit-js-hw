import Player from '@vimeo/player';

var throttle = require('lodash.throttle');

const DURATION_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const duration = JSON.parse(localStorage.getItem(DURATION_KEY));
player
  .setCurrentTime(duration)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

function onTimeUpdate(data) {
  const currentTime = data.seconds;
  localStorage.setItem(DURATION_KEY, JSON.stringify(currentTime));
}

player.on('timeupdate', throttle(onTimeUpdate, 1000));

console.log(throttle);
