import Phaser from '../lib/phaser';

import Virus from '../game/Virus';

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
  }


  constructor() {
    super('game-continue');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }


  create() {
    this.add.image(240, 320, 'background')
      .setScrollFactor(1, 0);

    // remove this:


    // create the group
    this.platforms = this.physics.add.staticGroup();

    this.platformB = this.physics.add.staticGroup();

    // then create 5 platforms from the group
    for (let i = 0; i < 5; i += 1) {
      const x = Phaser.Math.Between(50, 450);
      const y = 190 * i;

      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = this.platforms.create(x, y, 'platform');
      platform.scale = 1;

      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const { body } = platform;
      body.updateFromGameObject();
    }

    this.platformB.create(240, 450, 'platform')
      .setScale(1);

    this.player = this.physics.add.sprite(240, 320, 'bot-stand')
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

    this.virus = this.physics.add.group({
      classType: Virus,
    });

    // this.virus.get(240, 320, 'virus')

    this.physics.add.collider(this.platforms, this.virus);


    this.physics.add.collider(this.platforms, this.virus);
    // formatted this way to make it easier to read
    this.physics.add.overlap(
      this.player,
      this.virus,
      this.handleCollectVirus, // called on overlap
      undefined,
      this,
    );

    const style = { color: '#000', fontSize: 24 };
    this.virusCollectedText = this.add.text(240, 10, `Coronavirus Destroyed: ${window.virusCollected}`, style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0);

    this.add.image(100, 600, 'leftButton').setScrollFactor(1, 0).setInteractive()
      .on('pointerdown', () => this.leftclick())
      .on('pointerup', () => this.clickUp());
    this.add.image(380, 600, 'rightButton').setScrollFactor(1, 0).setInteractive()
      .on('pointerdown', () => this.rightclick())
      .on('pointerup', () => this.clickUp());
  }

  update() {
    this.platforms.children.iterate(child => {
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = child;
      const { scrollY } = this.cameras.main;
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();

        this.virusDisplay += 1;

        if ((this.virusDisplay % 3) === 0) {
          this.addVirusAbove(platform);
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
      window.score = window.virusCollected
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
      sprite.x = gameWidth + halfWidth;
    } else if (sprite.x > gameWidth + halfWidth) {
      sprite.x = -halfWidth;
    }
  }


  /**
* @param {Phaser.Physics.Arcade.Sprite} player
* @param {Virus} virus
*/
  handleCollectVirus(player, virus) {
    // hide from display
    this.virus.killAndHide(virus);

    // disable from physics world
    this.physics.world.disableBody(virus.body);

    // window.virusCollected += 1;

    const value = `Coronavirus: ${window.virusCollected}`;

    this.virusCollectedText.text = value;

    this.scene.start('rpg-player');
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