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

    this.add.text(35, 150, 'Ranking', { fontSize: 25, color: 'rgb(0,0,0)' });
    this.add.text(170, 150, 'Player', { fontSize: 25, color: 'rgb(0,0,0)' });
    this.add.text(295, 150, 'Score', { fontSize: 25, color: 'rgb(0,0,0)' });

    this.loading = this.add.text(200, 300, 'Loading...', { fontSize: 30, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.retrieveScore();
    // this.displayScore(score);

    // console.log(window.query)


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

  // displayScore(score) {
    
  //   console.log(score);
    

  // }

  async retrieveScore() {
    let position = 1;
    let space = 0
    const info = await Score.readScore();
    this.loading.text ='';
    info.forEach((doc) => {
      console.log(`${doc.data().first} => ${doc.data().score}`);
      this.add.text(80, 180 + space, `${position}`, { fontSize: 20, color: 'rgb(0,0,0)' });
      this.add.text(170, 180 + space, `${doc.data().first}`, { fontSize: 20, color: 'rgb(0,0,0)' });
      this.add.text(300, 180 + space, `${doc.data().score}`, { fontSize: 20, color: 'rgb(0,0,0)' });
      space += 30;
      position += 1;
    });
  }


}


