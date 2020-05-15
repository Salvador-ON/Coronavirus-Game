import Phaser from '../lib/phaser';
import Score from '../game/Score';

export default class ScoreBoard extends Phaser.Scene {
  constructor() {
    super('score-board');
  }

  

  create() {
    this.add.image(200, 320, 'background');
    const gameboard = this.add.image(200, 320, 'block');
    gameboard.setScale(1);


    this.add.text(200, 100, 'ScoreBoard', { fontSize: 48, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    Score.initBase();
    Score.readScore()
    console.log(window.query)


    this.add.image(200, 550, 'yellow-button')
      .setInteractive()
      .on('pointerdown', () => this.menu());

    this.add.text(200, 550, 'Menu', {
      fontSize: 28,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);
  }

  startGame() {
    this.scene.start('game');
  }

  menu() {
    this.scene.start('start');
  }
}
