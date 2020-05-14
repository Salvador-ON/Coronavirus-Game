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

    this.virusDamageMessage = this.add.text(240, 200, 'Your turn to attack', { fontSize: 20, color: 'rgb(0,0,0)' }).setOrigin(0.5);

    this.add.image(340, 310, 'virus').setScale(0.8);;
    this.add.image(140, 310, 'bot-attack')

    this.RobotDamageMessage = this.add.text(240, 460, '', { fontSize: 20, color: 'rgb(0,0,0)' }).setOrigin(0.5);


    this.soapButton = this.add.image(130, 550, 'yellow-button')
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => this.soapAttack());

    this.soapText = this.add.text(130, 550, 'Soap', {
      fontSize: 20,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);


    this.chlorineButton = this.add.image(240, 550, 'green-button')
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => this.chlorineAttack());

    this.chlorineText = this.add.text(240, 550, 'Chlorine', {
      fontSize: 20,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);


    this.uvLightButton = this.add.image(350, 550, 'blue-button')
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => this.uvLightAttack());

    this.uvLightText = this.add.text(350, 550, 'UV Light', {
      fontSize: 20,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);


  }

  startGame() {
    this.scene.start('game');
  }

  soapAttack() {
    this.soapButton.visible = false;
    this.soapText.visible = false;
    this.chlorineButton.visible = false;
    this.chlorineText.visible = false;
    this.uvLightButton.visible = false;
    this.uvLightText.visible = false;
    this.virusHealth -= this.soap;
    this.RobotDamageMessage.text = '';
    this.virusDamageMessage.text = `You made ${this.soap} points of damage`;
    this.sleep(2000).then(() => { this.virusAttackOp(); });


  }

  chlorineAttack() {
    this.soapButton.visible = false;
    this.soapText.visible = false;
    this.chlorineButton.visible = false;
    this.chlorineText.visible = false;
    this.uvLightButton.visible = false;
    this.uvLightText.visible = false;
    this.virusHealth -= this.chlorine;
    this.RobotDamageMessage.text = '';
    this.virusDamageMessage.text = `You made ${this.chlorine} points of damage`;
    this.sleep(2000).then(() => { this.virusAttackOp(); });
  }

  uvLightAttack() {
    this.soapButton.visible = false;
    this.soapText.visible = false;
    this.chlorineButton.visible = false;
    this.chlorineText.visible = false;
    this.uvLightButton.visible = false;
    this.uvLightText.visible = false;
    this.virusHealth -= this.uvLight;
    this.RobotDamageMessage.text = '';
    this.virusDamageMessage.text = `You made ${this.uvLight} points of damage`;
    this.sleep(2000).then(() => { this.virusAttackOp(); });
  }

  virusHealth() {
    const value = `Health: ${this.virusHealth}`;
    this.virusHealthText.text = value;
  }

  virusAttackOp() {
    window.robotHealth -= this.virusAttack;
    this.RobotDamageMessage.text = `You receive ${this.virusAttack} points of damage`;
    this.virusDamageMessage.text = 'Your turn';
    this.soapButton.visible = true;
    this.soapText.visible = true;
    this.chlorineButton.visible = true;
    this.chlorineText.visible = true;
    this.uvLightButton.visible = true;
    this.uvLightText.visible = true;

  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  update() {

    const valueVirus = `Virus Health: ${this.virusHealth}`;
    this.virusHealthText.text = valueVirus;


    const valueRobot = `Robot Health: ${window.robotHealth}`;
    this.robotHealthText.text = valueRobot;

  }
}
