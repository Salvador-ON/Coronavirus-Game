import Phaser from '../lib/phaser';

export default class RpgPlayer extends Phaser.Scene {
  constructor() {
    super('rpg-player');
  }

  init() {
    this.virusHealth = Math.floor(Math.random() * 7) + 3;
    this.virusAttack = Math.floor(Math.random() * 9) + 2;
    this.soap = Math.floor(Math.random() * 5) + 2;
    this.chlorine = Math.floor(Math.random() * 5) + 2;
    this.uvLight = Math.floor(Math.random() * 5) + 2;
  }


  create() {
    this.add.image(200, 320, 'background');
    const gameboard = this.add.image(200, 320, 'block');
    gameboard.setScale(1);

    this.add.text(200, 100, 'Fight Time', { fontSize: 30, color: 'rgb(0,0,0)' }).setOrigin(0.5);


    this.virusHealthText = this.add.text(200, 130, `Virus Health:${this.virusHealth}`, { color: '#000', fontSize: 20 }).setOrigin(0.5);

    this.robotHealthText = this.add.text(40, 10, `Robot Health:${window.robotHealth}`, { color: '#000', fontSize: 20 });

    this.virusDamageMessage = this.add.text(200, 200, 'Your turn to attack', { fontSize: 20, color: 'rgb(0,0,0)' }).setOrigin(0.5);

    this.add.image(300, 310, 'virus').setScale(0.8);
    this.add.image(100, 310, 'bot-attack');

    this.RobotDamageMessage = this.add.text(200, 460, '', { fontSize: 20, color: 'rgb(0,0,0)' }).setOrigin(0.5);


    this.soapButton = this.add.image(90, 550, 'yellow-button')
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => this.soapAttack());

    this.soapText = this.add.text(90, 550, 'Soap', { fontSize: 20, color: 'rgb(0,0,0)' })
      .setOrigin(0.5);


    this.chlorineButton = this.add.image(200, 550, 'green-button')
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => this.chlorineAttack());

    this.chlorineText = this.add.text(200, 550, 'Alcohol', { fontSize: 20, color: 'rgb(0,0,0)' })
      .setOrigin(0.5);


    this.uvLightButton = this.add.image(310, 550, 'blue-button')
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => this.uvLightAttack());

    this.uvLightText = this.add.text(310, 550, 'UV Light', { fontSize: 20, color: 'rgb(0,0,0)' })
      .setOrigin(0.5);
  }

  startGame() {
    this.scene.start('game');
  }

  virusHealthSubs(value) {
    this.virusHealth -= value;

    if (this.virusHealth < 0) {
      this.virusHealth = 0;
    }
  }


  playerWin(points) {
    if (this.defeatVirus()) {
      this.virusDamageMessage.text = 'You defeated the virus';
      this.RobotDamageMessage.text = '';
      RpgPlayer.collectVirus();
      this.ContinueButton = this.add.image(200, 550, 'green-button')
        .setScale(0.5)
        .setInteractive()
        .on('pointerdown', () => this.continueGame());

      this.continueText = this.add.text(200, 550, 'Continue', { fontSize: 20, color: 'rgb(0,0,0)' })
        .setOrigin(0.5);
    } else {
      this.RobotDamageMessage.text = '';
      this.virusDamageMessage.text = `You made ${points} points of damage`;
      RpgPlayer.sleep(2000).then(() => { this.virusAttackOp(); });
    }
  }

  static collectVirus() {
    window.virusCollected += 1;
  }

  soapAttack() {
    this.disableButtons();
    this.virusHealthSubs(this.soap);
    this.playerWin(this.soap);
  }


  chlorineAttack() {
    this.disableButtons();
    this.virusHealthSubs(this.chlorine);
    this.playerWin(this.chlorine);
  }

  uvLightAttack() {
    this.disableButtons();
    this.virusHealthSubs(this.uvLight);
    this.playerWin(this.uvLight);
  }

  disableButtons() {
    this.soapButton.visible = false;
    this.soapText.visible = false;
    this.chlorineButton.visible = false;
    this.chlorineText.visible = false;
    this.uvLightButton.visible = false;
    this.uvLightText.visible = false;
  }

  enableButtons() {
    this.soapButton.visible = true;
    this.soapText.visible = true;
    this.chlorineButton.visible = true;
    this.chlorineText.visible = true;
    this.uvLightButton.visible = true;
    this.uvLightText.visible = true;
  }

  virusHealth() {
    const value = `Health: ${this.virusHealth}`;
    this.virusHealthText.text = value;
  }

  virusAttackOp() {
    RpgPlayer.robotHealthSubs(this.virusAttack);
    this.playerloose();
  }

  playerloose() {
    if (RpgPlayer.gameOver()) {
      this.virusDamageMessage.text = 'The virus defeated you';
      this.RobotDamageMessage.text = '';

      this.ContinueButton = this.add.image(200, 550, 'green-button')
        .setScale(0.7)
        .setInteractive()
        .on('pointerdown', () => this.gameOverScreen());

      this.continueText = this.add.text(200, 550, 'Game Over', { fontSize: 18, color: 'rgb(0,0,0)' })
        .setOrigin(0.5);
    } else {
      this.RobotDamageMessage.text = `You received ${this.virusAttack} points of damage`;
      this.virusDamageMessage.text = 'Your turn';
      this.enableButtons();
    }
  }

  static robotHealthSubs(value) {
    window.robotHealth -= value;

    if (window.robotHealth < 0) {
      window.robotHealth = 0;
    }
  }

  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  defeatVirus() {
    if (this.virusHealth <= 0) {
      return true;
    }

    return false;
  }

  static gameOver() {
    if (window.robotHealth <= 0) {
      return true;
    }

    return false;
  }

  update() {
    const valueVirus = `Virus Health: ${this.virusHealth}`;
    this.virusHealthText.text = valueVirus;


    const valueRobot = `Robot Health: ${window.robotHealth}`;
    this.robotHealthText.text = valueRobot;
  }

  continueGame() {
    this.scene.start('game-continue');
  }

  gameOverScreen() {
    this.scene.start('game-over');
  }
}
