import Phaser from '../lib/phaser';


export default class Instruction extends Phaser.Scene {
  constructor() {
    super('instructions');
  }

  

  create() {
    this.add.image(200, 320, 'background');
    const gameboard = this.add.image(200, 320, 'block');
    gameboard.setScale(1);


    this.add.text(200, 100, 'Instructions', { fontSize: 48, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    

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
