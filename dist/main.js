/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/lib/phaser.js
/* harmony default export */ var phaser = (window.Phaser);

// CONCATENATED MODULE: ./src/game/Virus.js


class Virus_Virus extends phaser.Physics.Arcade.Sprite {
  /**
  * @param {Phaser.Scene} scene
  * @param {number} x
  * @param {number} y
  * @param {string} texture
   */
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.setScale(0.7);
  }
}

// CONCATENATED MODULE: ./src/game/Aid.js


class Aid_Aid extends phaser.Physics.Arcade.Sprite {
  /**
  * @param {Phaser.Scene} scene
  * @param {number} x
  * @param {number} y
  * @param {string} texture
   */
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.setScale(0.4);
  }
}

// CONCATENATED MODULE: ./src/scenes/Game.js






class Game_Game extends phaser.Scene {
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
      classType: Virus_Virus,
    });


    /** @type {Phaser.Physics.Arcade.Group} */
    this.aid = this.physics.add.group({
      classType: Aid_Aid,
    });
  }


  constructor() {
    super('game');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();

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
      const x = phaser.Math.Between(50, 370);
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

    this.physics.add.collider(this.platforms, this.aid);
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
        platform.y = scrollY - phaser.Math.Between(50, 100);
        platform.x = phaser.Math.Between(50, 370);
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

// CONCATENATED MODULE: ./src/scenes/GameContinue.js






class GameContinue_GameContinue extends phaser.Scene {
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
      classType: Virus_Virus,
    });

    /** @type {Phaser.Physics.Arcade.Group} */
    this.aid = this.physics.add.group({
      classType: Aid_Aid,
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

    // remove this:


    // create the group
    this.platforms = this.physics.add.staticGroup();

    this.platformB = this.physics.add.staticGroup();

    // then create 5 platforms from the group
    for (let i = 0; i < 5; i += 1) {
      const x = phaser.Math.Between(50, 370);
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

    this.physics.add.collider(this.platforms, this.aid);


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
        platform.y = scrollY - phaser.Math.Between(50, 100);
        platform.x = phaser.Math.Between(50, 370);
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

    this.virusCollectedText.text = `Coronavirus: ${window.virusCollected}`;

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

// CONCATENATED MODULE: ./src/scenes/Start.js



class Start_Start extends phaser.Scene {
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
      progressBar.fillRect(50, 280, 300 * value, 30);
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

// CONCATENATED MODULE: ./src/game/Score.js
class Score {
  static initBase() {
    firebase.initializeApp({ // eslint-disable-line no-undef
      apiKey: 'AIzaSyBZ07ZYBN1nQiUiNe7cuUrFJy327wtBi3s',
      authDomain: 'AUTHDOMAIN',
      projectId: 'coronavirus-game-95a5f',
    });

    // Initialize Firebase
    window.db = firebase.firestore(); // eslint-disable-line no-undef
  }

  static saveUser(playerName, playerScore) {
    const name = playerName;
    const score = playerScore;
    window.db.collection('users').add({
      first: name,
      score,
    })
      .then((docRef) => {
        // console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        // console.error('Error adding document: ', error);
      });
  }

  static readScore() {
    return window.db.collection('users').orderBy('score', 'desc').limit(10)
      .get()
      .then((querySnapshot) => {
        const query = querySnapshot;
        // console.log(query);
        // query.forEach((doc) => {
        //   // doc.data() is never undefined for query doc snapshots
        // console.log(`${doc.data().first} => ${doc.data().score}`);
        // });

        return query
      })
      .catch((error) => { // eslint-disable-line no-undef
        // console.log('Error getting documents: ', error);
      });
  }


}










/* harmony default export */ var game_Score = (Score);

// CONCATENATED MODULE: ./src/scenes/GameOver.js



class GameOver_GameOver extends phaser.Scene {
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

    this.validationLabel = this.add.text(200, 400, '', { fontSize: 15, color: 'rgb(255,0,0)' }).setOrigin(0.5);


    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.id = 'nameField';
    inputField.className = 'rounded';
    inputField.placeholder = 'Min 3 & Max 10 Letters';
    document.getElementById('gameCont').appendChild(inputField);

    this.add.image(200, 350, 'green-button')
      .setInteractive()
      .on('pointerdown', () => this.submitName());

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

    this.scoreLocal();
  }

  scoreLocal() {
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
  }

  startGame() {
    document.getElementById('nameField').remove();
    this.scene.start('game');
  }

  scoreBoard() {
    document.getElementById('nameField').remove();
    this.scene.start('score-board');
  }


  submitName() {
    this.name = document.getElementById('nameField').value;
    if (this.validateData(this.name.length)) {
      game_Score.saveUser(this.capitalize(this.name), window.virusCollected);
      this.scoreBoard();
    } else {
      this.validationLabel.text = 'Invalid input';
    }
  }


  validateData(name) {
    this.nameLength = name;
    if (this.nameLength >= 3 && this.nameLength < 10) {
      return true;
    }


    return false;
  }

  capitalize(s){
    if (typeof s !== 'string') return s
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}

// CONCATENATED MODULE: ./src/scenes/ScoreBoard.js



class ScoreBoard_ScoreBoard extends phaser.Scene {
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
    const info = await game_Score.readScore();
    this.loading.text ='';
    info.forEach((doc) => {
      this.add.text(80, 180 + space, `${position}`, { fontSize: 20, color: 'rgb(0,0,0)' });
      this.add.text(170, 180 + space, `${doc.data().first}`, { fontSize: 20, color: 'rgb(0,0,0)' });
      this.add.text(300, 180 + space, `${doc.data().score}`, { fontSize: 20, color: 'rgb(0,0,0)' });
      space += 30;
      position += 1;
    });
  }


}



// CONCATENATED MODULE: ./src/scenes/RpgPlayer.js


class RpgPlayer_RpgPlayer extends phaser.Scene {
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

    this.virusImage = this.add.image(300, 310, 'virus').setScale(0.8);
    this.botImage = this.add.image(100, 310, 'bot-attack');

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
      RpgPlayer_RpgPlayer.collectVirus();
      this.virusImage.visible = false;
      this.botImage.x = 200;
      this.ContinueButton = this.add.image(200, 550, 'green-button')
        .setScale(0.5)
        .setInteractive()
        .on('pointerdown', () => this.continueGame());

      this.continueText = this.add.text(200, 550, 'Continue', { fontSize: 20, color: 'rgb(0,0,0)' })
        .setOrigin(0.5);
    } else {
      this.RobotDamageMessage.text = '';
      this.virusDamageMessage.text = `You made ${points} points of damage`;
      RpgPlayer_RpgPlayer.sleep(2000).then(() => { this.virusAttackOp(); });
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
    RpgPlayer_RpgPlayer.robotHealthSubs(this.virusAttack);
    this.playerloose();
  }

  playerloose() {
    if (RpgPlayer_RpgPlayer.gameOver()) {
      this.virusDamageMessage.text = 'The virus defeated you';
      this.RobotDamageMessage.text = '';

      this.virusImage.x = 200;
      this.botImage.visible = false;

      this.ContinueButton = this.add.image(200, 550, 'green-button')
        .setScale(0.7)
        .setInteractive()
        .on('pointerdown', () => this.gameOverScreen());

      this.continueText = this.add.text(200, 550, 'Game Over', { fontSize: 18, color: 'rgb(0,0,0)' })
        .setOrigin(0.5);
    } else {
      this.RobotDamageMessage.text = `Received ${this.virusAttack} points of damage`;
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

// CONCATENATED MODULE: ./src/scenes/Instructions.js



class Instructions_Instruction extends phaser.Scene {
  constructor() {
    super('instructions');
  }

  

  create() {
    this.add.image(200, 320, 'background');
    const gameboard = this.add.image(200, 320, 'block');
    gameboard.setScale(1);


    this.add.text(200, 90, 'Instructions', { fontSize: 48, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 130, 'Defeat the Coronavirus', { fontSize: 16, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 150, 'Is mix of an infinity jumper and rpg.', { fontSize: 16, color: 'rgb(0,0,0)' }).setOrigin(0.5);

    this.add.text(200, 190, 'Mission:', { fontSize: 30, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 220, '- Destroy as many viruses as possible. ', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 239, '- Pick all the first aid kits.', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 255, 'So you could survive more virus attacks.', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);

    this.add.text(200, 275, '- You can defeat the virus with:', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 295, 'Soap, Alcohol, UVLigh.', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 325, 'Be careful ', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 345, 'Each virus has different resistance.', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    
    this.add.text(200, 385, 'Controls:', { fontSize: 30, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 410, 'Desktop device: ', { fontSize: 18, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 430, 'Use the arrows keys and cursor ', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);

    this.add.text(200, 455, 'Mobile device: ', { fontSize: 18, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 475, 'Use the yellow arrows to move.', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);
    this.add.text(200, 495, 'Tap on the buttons', { fontSize: 15, color: 'rgb(0,0,0)' }).setOrigin(0.5);

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
}

// CONCATENATED MODULE: ./src/index.js



















/* harmony default export */ var src = __webpack_exports__["default"] = (new phaser.Game({
  type: phaser.AUTO,
  width: 400,
  height: 640,
  scene: [Start_Start, Game_Game, GameOver_GameOver, RpgPlayer_RpgPlayer, GameContinue_GameContinue, ScoreBoard_ScoreBoard, Instructions_Instruction],
  parent: 'gameCont',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 160,
      },
      debug: false,
    },
  },

}));


game_Score.initBase();

/***/ })
/******/ ]);