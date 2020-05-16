import Phaser from '../lib/phaser';

import Virus from '../game/Virus';

import Aid from '../game/Aid';

export default class GameContinue extends Phaser.Scene {
  init() {
    this.left = 0;
    this.right = 0;
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
    super('game-continue');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }


  create() {
    this.add.image(200, 320, 'background')
      .setScrollFactor(1, 0);


    this.platforms = this.physics.add.staticGroup();
    this.platformB = this.physics.add.staticGroup();

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

    this.physics.add.collider(this.platforms, this.player);
    this.physics.add.collider(this.platformB, this.player);

    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(this.scale.width * 1.5);


    this.physics.add.collider(this.platforms, this.virus);
    this.physics.add.collider(this.platforms, this.aid);

    this.physics.add.overlap(
      this.player,
      this.virus,
      this.handleCollectVirus,
      undefined,
      this,
    );

    this.physics.add.overlap(
      this.player,
      this.aid,
      this.handleCollectAid,
      undefined,
      this,
    );

    const style = { color: '#000', fontSize: 24 };
    this.virusCollectedText = this.add.text(200, 10, `Coronavirus Destroyed: ${window.virusCollected}`, style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0);

    this.robotHeadText = this.add.text(200, 586, `Robot Health: ${window.robotHealth}`, style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0);

    this.add.image(60, 600, 'leftButton').setScrollFactor(1, 0).setInteractive()
      .on('pointerdown', () => this.leftclick())
      .on('pointerup', () => this.clickUp());
    this.add.image(340, 600, 'rightButton').setScrollFactor(1, 0).setInteractive()
      .on('pointerdown', () => this.rightclick())
      .on('pointerup', () => this.clickUp());
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


    const touchingDown = this.player.body.touching.down;
    if (touchingDown) {
      this.player.setVelocityY(-300);
      this.player.setTexture('bot-jump');
      this.sound.play('jump');
    }

    const vy = this.player.body.velocity.y;
    if (vy > 0 && this.player.texture.key !== 'bot-stand') {
      this.player.setTexture('bot-stand');
    }

    if ((this.cursors.left.isDown || this.left === 1) && !touchingDown) {
      this.player.setVelocityX(-200);
    } else if ((this.cursors.right.isDown || this.right === 1) && !touchingDown) {
      this.player.setVelocityX(200);
    } else {
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
    this.virus.killAndHide(virus);
    this.physics.world.disableBody(virus.body);
    this.virusCollectedText.text = `Coronavirus: ${window.virusCollected}`;
    this.robotHeadText.text = `Robot Health: ${window.robotHealth}`;
    this.scene.start('rpg-player');
  }

  handleCollectAid(player, aid) {
    this.aid.killAndHide(aid);
    this.physics.world.disableBody(aid.body);
    window.robotHealth += 3;
    this.robotHeadText.text = `Robot Health: ${window.robotHealth}`;
  }

  /**
* @param {Phaser.GameObjects.Sprite} sprite
*/
  addVirusAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;
    /** @type {Phaser.Physics.Arcade.Sprite} */
    const coronovirus = this.virus.get(sprite.x, y, 'virus');

    coronovirus.setActive(true);
    coronovirus.setVisible(true);
    this.add.existing(coronovirus);
    coronovirus.body.setSize(coronovirus.width, coronovirus.height);
    this.physics.world.enable(coronovirus);

    return coronovirus;
  }

  addAidAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;
    /** @type {Phaser.Physics.Arcade.Sprite} */
    const aid = this.aid.get(sprite.x, y, 'aid');


    aid.setActive(true);
    aid.setVisible(true);
    this.add.existing(aid);
    aid.body.setSize(aid.width, aid.height);
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
