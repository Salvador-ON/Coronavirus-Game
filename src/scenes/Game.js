import Phaser from '../lib/phaser';

import Virus from '../game/Virus';

import Aid from '../game/Aid';

export default class Game extends Phaser.Scene {
  init() {
    this.left = 0;
    this.right = 0;
    window.robotHealth = 10;
    window.virusCollected = 0;
    this.virusDisplay = 0;
    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    this.cursors = this.input.keyboard.createCursorKeys();

    // /** @type {Phaser.Physics.Arcade.StaticGroup} */
    // this.platforms == this.physics.add.staticGroup();

    /** @type {Phaser.Physics.Arcade.Group} */
    this.virus = this.physics.add.group({
      classType: Virus,
    });


    /** @type {Phaser.Physics.Arcade.Group} */
    this.aid = this.physics.add.group({
      classType: Aid,
    });
  }





  constructor() {
    super('game');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();

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
      y: height / 2 - 5,
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
      assetText.setText(`Loading asset: ${file.src}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

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
  }


  create() {
    this.add.image(200, 320, 'background')
      .setScrollFactor(1, 0);

    // remove this:


    // create the group
    this.platforms = this.physics.add.staticGroup();

    this.platformB = this.physics.add.staticGroup();

    // then create 5 platforms from the group
    for (let i = 0; i < 5; i += 1) {
      const x = Phaser.Math.Between(50, 370);
      const y = 190 * i;

      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = this.platforms.create(x, y, 'platform');
      platform.scale = 1;

      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const { body } = platform;
      body.updateFromGameObject();
    }

    this.platformB.create(200, 450, 'platform')
      .setScale(1);

    this.player = this.physics.add.sprite(200, 320, 'bot-stand')
      .setScale(1);

    this.player.body.setSize(35, 125);

    // same thing here in the second parameter
    this.physics.add.collider(this.platforms, this.player);
    this.physics.add.collider(this.platformB, this.player);

    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(this.scale.width * 1.5);

    // this.virus = this.physics.add.group({
    //   classType: Virus,
    // });

    // this.virus.get(240, 320, 'virus')

    this.physics.add.collider(this.platforms, this.virus);

    this.physics.add.collider(this.platforms, this.aid)
    // formatted this way to make it easier to read
    this.physics.add.overlap(
      this.player,
      this.virus,
      this.handleCollectVirus, // called on overlap
      undefined,
      this,
    );


    this.physics.add.overlap(
      this.player,
      this.aid,
      this.handleCollectAid, // called on overlap
      undefined,
      this,
    );

    this.add.image(60, 600, 'leftButton').setScrollFactor(1, 0).setInteractive()
      .on('pointerdown', () => this.leftclick())
      .on('pointerup', () => this.clickUp());
    this.add.image(340, 600, 'rightButton').setScrollFactor(1, 0).setInteractive()
      .on('pointerdown', () => this.rightclick())
      .on('pointerup', () => this.clickUp());

      const style = { color: '#000', fontSize: 24 };
    this.virusCollectedText = this.add.text(200, 10, `Coronavirus Destroyed: ${window.virusCollected}`, style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0);

    this.robotHeadText = this.add.text(200, 586, `Robot Health: ${window.robotHealth}`, style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0);
  }

  update() {
    this.platforms.children.iterate((child) => {
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = child;
      const { scrollY } = this.cameras.main;
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.x = Phaser.Math.Between(50, 370);
        platform.body.updateFromGameObject();

        this.virusDisplay += 1;

        if ((this.virusDisplay % 17) === 0) {
          this.addVirusAbove(platform);
        }

        if ((this.virusDisplay % 7) === 0) {
          this.addAidAbove(platform);
        }
      }
    });

    // find out from Arcade Physics if the player's physics body
    // is touching something below it

    const touchingDown = this.player.body.touching.down;
    if (touchingDown) {
      this.player.setVelocityY(-300);

      // switch to jump texture
      this.player.setTexture('bot-jump');
      this.sound.play('jump');
    }

    const vy = this.player.body.velocity.y;
    if (vy > 0 && this.player.texture.key !== 'bot-stand') {
      // switch back to jump when falling
      this.player.setTexture('bot-stand');
    }


    // left and right input logic
    if ((this.cursors.left.isDown || this.left === 1) && !touchingDown) {
      this.player.setVelocityX(-200);
    } else if ((this.cursors.right.isDown || this.right === 1) && !touchingDown) {
      this.player.setVelocityX(200);
    } else {
      // stop movement if not left or right
      this.player.setVelocityX(0);
    }

    this.horizontalWrap(this.player);

    const bottomPlatform = this.findBottomMostPlatform();
    if (this.player.y > bottomPlatform.y + 200) {
      this.scene.start('game-over');
    }
  }


  /**
  * @param {Phaser.GameObjects.Sprite} sprite
  */
  horizontalWrap(sprite) {
    const halfWidth = sprite.displayWidth * 0.5;
    const gameWidth = this.scale.width;
    if (sprite.x < -halfWidth) {
      sprite.x = gameWidth + halfWidth; // eslint-disable-line no-param-reassign
    } else if (sprite.x > gameWidth + halfWidth) {
      sprite.x = -halfWidth; // eslint-disable-line no-param-reassign
    }
  }


  /**
  * @param {Phaser.Physics.Arcade.Sprite} player
  * @param {Virus} virus
  * @param {Aid} aid
  */
  handleCollectVirus(player, virus) {
    // hide from display
    this.virus.killAndHide(virus);

    // disable from physics world
    this.physics.world.disableBody(virus.body);

    // window.virusCollected += 1;

    this.virusCollectedText.text = `Coronavirus Destroyed: ${window.virusCollected}`;

    this.robotHeadText.text = `Robot Health: ${window.robotHealth}`;

    this.scene.start('rpg-player');
  }


  handleCollectAid(player, aid) {
    // hide from display
    this.aid.killAndHide(aid);

    // disable from physics world
    this.physics.world.disableBody(aid.body);

    // window.virusCollected += 1;
    window.robotHealth += 3;

    this.robotHeadText.text = `Robot Health: ${window.robotHealth}`;

    console.log('+1');
  }

  /**
  * @param {Phaser.GameObjects.Sprite} sprite
  */
  addVirusAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;
    /** @type {Phaser.Physics.Arcade.Sprite} */
    const coronovirus = this.virus.get(sprite.x, y, 'virus');

    // set active and visible
    coronovirus.setActive(true);
    coronovirus.setVisible(true);

    this.add.existing(coronovirus);

    coronovirus.body.setSize(coronovirus.width, coronovirus.height);

    // make sure body is enabed in the physics world
    this.physics.world.enable(coronovirus);

    return coronovirus;
  }

  addAidAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;
    /** @type {Phaser.Physics.Arcade.Sprite} */
    const aid = this.aid.get(sprite.x, y, 'aid');

    // set active and visible
    aid.setActive(true);
    aid.setVisible(true);

    this.add.existing(aid);

    aid.body.setSize(aid.width, aid.height);

    // make sure body is enabed in the physics world
    this.physics.world.enable(aid);

    return aid;
  }

  findBottomMostPlatform() {
    const platforms = this.platforms.getChildren();
    let bottomPlatform = platforms[0];

    for (let i = 1; i < platforms.length; i += 1) {
      const platform = platforms[i];


      if (platform.y < bottomPlatform.y) {
        continue; // eslint-disable-line no-continue
      }

      bottomPlatform = platform;
    }

    return bottomPlatform;
  }

  leftclick() {
    this.left = 1;
    this.right = 0;
  }

  rightclick() {
    this.left = 0;
    this.right = 1;
  }

  clickUp() {
    this.left = 0;
    this.right = 0;
  }
}
