import Phaser from './lib/phaser';

import Game from './scenes/Game';

import Start from './scenes/Start';

import GameOver from './scenes/GameOver';


export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  scene: [Start, Game, GameOver],
  parent: 'gameCont',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 160,
      },
      debug: false,
    },
  },

});
