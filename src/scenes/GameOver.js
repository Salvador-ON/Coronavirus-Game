import Phaser from '../lib/phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over');
  }


  create() {
    this.add.image(200, 320, 'background');
    const gameboard = this.add.image(200, 320, 'block');
    gameboard.setScale(1);

    this.add.text(200, 100, 'Game Over', { fontSize: 48, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 150, 'You Destroyed:', { fontSize: 33, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 190, `${window.virusCollected} Coronavirus`, { fontSize: 33, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 240, 'Type your name', { fontSize: 25, color: 'rgb(0,0,0)' }).setOrigin(0.5);

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.id = 'nameField';
    document.getElementById('gameCont').appendChild(inputField);

    this.add.image(200, 350, 'green-button')
      .setInteractive()
      .on('pointerdown', () => this.startGame());

    this.add.text(200, 350, 'Submit Score', {
      fontSize: 26,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);

    this.add.image(200, 550, 'yellow-button')
      .setInteractive()
      .on('pointerdown', () => this.startGame());

    this.add.text(200, 550, 'Play Again', {
      fontSize: 28,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);

    if (localStorage.getItem('record') !== null) {
      this.record = JSON.parse(localStorage.getItem('record'));

      if (parseInt(this.record, 10) < window.virusCollected) {
        this.add.text(200, 440, 'You Have', { fontSize: 25, color: 'rgb(0,0,0)' }).setOrigin(0.5);
        this.add.text(200, 480, 'New High Score!!!', { fontSize: 25, color: 'rgb(0,0,0)' }).setOrigin(0.5);
        localStorage.setItem('record', JSON.stringify(window.virusCollected));
      } else {
        this.add.text(200, 440, 'Try Again', { fontSize: 25, color: 'rgb(0,0,0)' }).setOrigin(0.5);
        this.add.text(200, 480, `Your High Score is: ${this.record}`, { fontSize: 25, color: 'rgb(0,0,0)' }).setOrigin(0.5);
      }
    } else {
      this.add.text(200, 440, 'You Have', { fontSize: 25, color: 'rgb(0,0,0)' }).setOrigin(0.5);
      this.add.text(200, 480, 'New High Score!!!', { fontSize: 25, color: 'rgb(0,0,0)' }).setOrigin(0.5);
      localStorage.setItem('record', JSON.stringify(window.score));
    }

    // this.input.keyboard.once('keydown_SPACE', () => {
    //   this.startGame();
    // });
  }

  startGame() {
    document.getElementById('nameField').remove();
    this.scene.start('game');
  }

  static submitResult() {

  }


  static validateData() {

  }
}
