import Phaser from '../lib/phaser';

export default class Start extends Phaser.Scene {
  constructor() {
    super('start');
  }

  preload() {
    this.load.image('background-menu', 'assets/welcome-screen.png');
    this.load.image('yellow-button', 'assets/yellow_button00.png');
    this.load.image('green-button', 'assets/green_button00.png');
    this.load.image('blue-button', 'assets/blue_button00.png');
  }

  create() {
    this.add.image(240, 320, 'background-menu');
    this.add.image(240, 500, 'yellow-button')
      .setInteractive()
      .on('pointerdown', () => this.startGame());
    this.add.image(240, 550, 'green-button');
    this.add.image(240, 600, 'blue-button');


    this.add.text(240, 500, 'Start', {
      fontSize: 38,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);

    this.add.text(240, 550, 'How to play', {
      fontSize: 25,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);

    this.add.text(240, 600, 'Scores', {
      fontSize: 25,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);


    this.input.keyboard.once('keydown_SPACE', () => {
      this.scene.start('game');
    });
  }


  startGame() {
    this.scene.start('game');
  }
}