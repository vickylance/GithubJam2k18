import { Game } from 'phaser';
import LoadGame from './scenes/LoadGame';

const game = new Game({
  width: 640,
  height: 360,
  type: Phaser.WEBGL,
  pixelArt: true,
  roundPixels: true,
  scene: [LoadGame],
  title: 'They came from SPACE',
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: false,
      debug: false
    }
  },
  banner: {
    text: '#ffffff',
    background: ['#fff200', '#38f0e8', '#00bff3', '#ec008c'],
    hidePhaser: true
  }
});

function resize() {
  const canvas = document.querySelector('canvas');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = game.config.width / game.config.height;

  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + 'px';
    canvas.style.height = windowWidth / gameRatio + 'px';
  } else {
    canvas.style.width = windowHeight * gameRatio + 'px';
    canvas.style.height = windowHeight + 'px';
  }
}

window.onload = () => {
  resize();
  window.addEventListener('resize', resize, false);
};

// This is for preventing re-run multiple scenes
if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
  });
}
