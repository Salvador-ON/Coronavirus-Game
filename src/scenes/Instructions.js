import Phaser from '../lib/phaser';


export default class Instruction extends Phaser.Scene {
  constructor() {
    super('instructions');
  }


  create() {
    this.add.image(200, 320, 'background');
    const gameboard = this.add.image(200, 320, 'block');
    gameboard.setScale(1);


    this.add.text(200, 90, 'Instructions', { fontSize: 48, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 130, 'Defeat the Coronavirus', { fontSize: 16, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 150, 'Is mix of an infinity jumper and rpg.', { fontSize: 16, color: 'rgb(0,0,0)' }).setOrigin(0.5);

    this.add.text(200, 190, 'Mission:', { fontSize: 30, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 220, '- Destroy as many viruses as possible. ', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 239, '- Pick all the first aid kits.', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 255, 'So you could survive more virus attacks.', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);

    this.add.text(200, 275, '- You can defeat the virus with:', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 295, 'Soap, Alcohol, UVLigh.', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 325, 'Be careful ', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 345, 'Each virus has different resistance.', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);

    this.add.text(200, 385, 'Controls:', { fontSize: 30, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 410, 'Desktop device: ', { fontSize: 18, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 430, 'Use the arrows keys and cursor ', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);

    this.add.text(200, 455, 'Mobile device: ', { fontSize: 18, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 475, 'Use the yellow arrows to move.', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 495, 'Tap on the buttons', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);

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
