import Phaser from '../lib/phaser';

export default class RpgPlayer extends Phaser.Scene {
  constructor() {
    super('rpg-player');
  }

  init() {
    this.virusHealth = Math.floor(Math.random() * 11);
    this.virusAttack = Math.floor(Math.random() * 10) + 1;
    this.soap = 3;
    this.chlorine = 5;
    this.uvLight = 7;


  }




  create() {


    this.add.image(240, 320, 'background');
    const gameboard = this.add.image(240, 320, 'block')
    gameboard.setScale(1);

    this.add.text(240, 100, 'Fight Time', { fontSize: 30, color: 'rgb(0,0,0)' }).setOrigin(0.5);


    this.virusHealthText = this.add.text(240, 130, `Virus Health:${this.virusHealth}`, { color: '#000', fontSize: 20 }).setOrigin(0.5);

    this.robotHealthText = this.add.text(40, 10, `Robot Health:${window.robotHealth}`, { color: '#000', fontSize: 20 });

    this.add.image(340, 280, 'virus').setScale(0.8);;
    this.add.image(140, 280, 'bot-attack')


    this.add.image(130, 550, 'yellow-button')
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => this.soapAttack());

    this.add.text(130, 550, 'Soap', {
      fontSize: 20,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);


    this.add.image(240, 550, 'green-button')
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => this.chlorineAttack());

    this.add.text(240, 550, 'Chlorine', {
      fontSize: 20,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);


    this.add.image(350, 550, 'blue-button')
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => this.uvLightAttack());

    this.add.text(350, 550, 'UV Light', {
      fontSize: 20,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);


  }

  startGame() {
    this.scene.start('game');
  }

  soapAttack() {
    this.virusHealth -= this.soap;
    this.virusAttackOp();
  }

  chlorineAttack() {
    this.virusHealth -= this.chlorine
    this.virusAttackOp();
  }

  uvLightAttack() {
    this.virusHealth -= this.uvLight;
    this.virusAttackOp();
  }

  virusHealth() {
    const value = `Health: ${this.virusHealth}`;
    this.virusHealthText.text = value;
  }

  virusAttackOp(){
    window.robotHealth -= this.virusAttack;;
    
  }



  update() {

    const valueVirus = `Health: ${this.virusHealth}`;
    this.virusHealthText.text = valueVirus;


    const valueRobot = `Health: ${window.robotHealth}`;
    this.robotHealthText.text = valueRobot;

  }
}
