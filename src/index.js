import Phaser from './lib/phaser';

import Game from './scenes/Game';

import GameContinue from './scenes/GameContinue';

import Start from './scenes/Start';

import GameOver from './scenes/GameOver';

import RpgPlayer from './scenes/RpgPlayer';


export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 400,
  height: 640,
  scene: [Start, Game, GameOver, RpgPlayer, GameContinue],
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
