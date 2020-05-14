import Phaser from '../lib/phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over');
  }




  create() {


    this.add.image(240, 320, 'background');
    const gameboard = this.add.image(240, 320, 'block')
    gameboard.setScale(1);

    this.add.text(240, 100, 'Game Over', { fontSize: 48, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(240, 150, 'You Collected:', { fontSize: 33, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(240, 190, `${window.score} Coronavirus`, { fontSize: 33, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(240, 240, 'Type your name', { fontSize: 25, color: 'rgb(0,0,0)' }).setOrigin(0.5);

    let inputField = document.createElement("input");
    inputField.type = 'text';
    inputField.id = 'nameField';
    document.getElementById('gameCont').appendChild(inputField)

    this.add.image(240, 550, 'yellow-button')
      .setInteractive()
      .on('pointerdown', () => this.startGame());

    this.add.text(240, 550, 'Play Again', {
      fontSize: 28,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);

    if (localStorage.getItem('record') !== null) {
      this.record = JSON.parse(localStorage.getItem('record'));

      if (parseInt(this.record) < window.score) {
        this.add.text(240, 440, 'You Have', { fontSize: 25, color: 'rgb(0,0,0)' }).setOrigin(0.5);
        this.add.text(240, 480, 'New High Score!!!', { fontSize: 25, color: 'rgb(0,0,0)' }).setOrigin(0.5);
        localStorage.setItem('record', JSON.stringify(window.score))
      }
      else {
        this.add.text(240, 440, 'Try Again', { fontSize: 25, color: 'rgb(0,0,0)' }).setOrigin(0.5);
        this.add.text(240, 480, `Your High Score is: ${this.record}`, { fontSize: 25, color: 'rgb(0,0,0)' }).setOrigin(0.5);
      }
    }
    else {
      this.add.text(240, 440, 'You Have', { fontSize: 25, color: 'rgb(0,0,0)' }).setOrigin(0.5);
      this.add.text(240, 480, 'New High Score!!!', { fontSize: 25, color: 'rgb(0,0,0)' }).setOrigin(0.5);
      localStorage.setItem('record', JSON.stringify(window.score))
    }



    this.input.keyboard.once('keydown_SPACE', () => {
      this.startGame();
    });
  }

  startGame() {
    document.getElementById('nameField').remove();
    this.scene.start('game');
  }
}
