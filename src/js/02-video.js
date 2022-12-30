import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const time = 'videoplayer-current-time';
const saveTime = JSON.parse(localStorage.getItem(time)) || 0;

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay({ seconds }) {
  localStorage.setItem(time, seconds);
}
player.setCurrentTime(saveTime);
