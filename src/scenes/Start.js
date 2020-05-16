import Phaser from '../lib/phaser';


export default class Start extends Phaser.Scene {
  constructor() {
    super('start');
  }

  

  preload() {
 
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(40, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: '',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 25,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(40, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading: ${file.src}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image('background-menu', 'assets/welcome-screen.png');
    this.load.image('logo', 'assets/virus.png');
    this.load.image('background', 'assets/game-background.png');
    this.load.image('platform', 'assets/platformIndustrial_008.png');
    this.load.image('bot-stand', 'assets/character_robot_cheer0.png');
    this.load.image('bot-jump', 'assets/character_robot_cheer1.png');
    this.load.image('bot-attack', 'assets/character_robot_attack2.png');
    this.load.image('virus', 'assets/virus-small.png');
    this.load.audio('jump', 'assets/phaseJump1.ogg');
    this.load.image('leftButton', 'assets/yellow_sliderLeft.png');
    this.load.image('rightButton', 'assets/yellow_sliderRight.png');
    this.load.image('block', 'assets/gameboard.png');
    this.load.image('aid', 'assets/aid-pack.png');
    this.load.image('yellow-button', 'assets/yellow_button00.png');
    this.load.image('green-button', 'assets/green_button00.png');
    this.load.image('blue-button', 'assets/blue_button00.png');
  }

  create() {
    this.add.image(200, 320, 'background-menu');
    this.add.image(200, 500, 'yellow-button')
      .setInteractive()
      .on('pointerdown', () => this.startGame());

    this.add.image(200, 550, 'green-button').setInteractive()
    .on('pointerdown', () => this.instructions());

    this.add.image(200, 600, 'blue-button')
    .setInteractive()
    .on('pointerdown', () => this.scoreBoard());


    this.add.text(200, 500, 'Start', {
      fontSize: 38,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);

    this.add.text(200, 550, 'How to play', {
      fontSize: 25,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);

    this.add.text(200, 600, 'Scores', {
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

  scoreBoard() {
    this.scene.start('score-board');
  }

  instructions() {
    this.scene.start('instructions');
  }
}
