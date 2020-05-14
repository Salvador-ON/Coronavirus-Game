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

// CONCATENATED MODULE: ./src/scenes/Game.js




class Game_Game extends phaser.Scene {
  init() {
    this.left = 0;
    this.right = 0;
    window.robotHealth = 100;
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
  }


  constructor() {
    super('game');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(80, 270, 320, 50);

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
      progressBar.fillRect(80, 280, 300 * value, 30);
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
      const x = phaser.Math.Between(50, 450);
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
      classType: Virus_Virus,
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
        platform.y = scrollY - phaser.Math.Between(50, 100);
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

    const value = `Coronavirus Destroyed: ${window.virusCollected}`;
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
      const x = phaser.Math.Between(50, 450);
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
      classType: Virus_Virus,
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
        platform.y = scrollY - phaser.Math.Between(50, 100);
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
// CONCATENATED MODULE: ./src/scenes/Start.js


class Start_Start extends phaser.Scene {
  constructor() {
    super('start');
  }

  preload() {
    this.load.image('background-menu', 'assets/welcome-screen.png');
    this.load.image('yellow-button', 'assets/yellow_button00.png');
    this.load.image('green-button', 'assets/green_button00.png');
    this.load.image('blue-button', 'assets/blue_button00.png');
  }

  create() {
    this.add.image(240, 320, 'background-menu');
    this.add.image(240, 500, 'yellow-button')
      .setInteractive()
      .on('pointerdown', () => this.startGame());
    this.add.image(240, 550, 'green-button');
    this.add.image(240, 600, 'blue-button');


    this.add.text(240, 500, 'Start', {
      fontSize: 38,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);

    this.add.text(240, 550, 'How to play', {
      fontSize: 25,
      color: 'rgb(0,0,0)',
    })
      .setOrigin(0.5);

    this.add.text(240, 600, 'Scores', {
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
}
// CONCATENATED MODULE: ./src/scenes/GameOver.js


class GameOver_GameOver extends phaser.Scene {
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

// CONCATENATED MODULE: ./src/scenes/RpgPlayer.js


class RpgPlayer_RpgPlayer extends phaser.Scene {
  constructor() {
    super('rpg-player');
  }

  init() {
    this.virusHealth = Math.floor(Math.random() * 10) + 1;
    this.virusAttack = Math.floor(Math.random() * 9) + 2;
    this.soap = Math.floor(Math.random() * 5) + 2;
    this.chlorine = Math.floor(Math.random() * 5) + 2;
    this.uvLight = Math.floor(Math.random() * 5) + 2;
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

    this.soapText = this.add.text(130, 550, 'Soap', { fontSize: 20, color: 'rgb(0,0,0)', })
      .setOrigin(0.5);


    this.chlorineButton = this.add.image(240, 550, 'green-button')
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => this.chlorineAttack());

    this.chlorineText = this.add.text(240, 550, 'Chlorine', { fontSize: 20, color: 'rgb(0,0,0)', })
      .setOrigin(0.5);


    this.uvLightButton = this.add.image(350, 550, 'blue-button')
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => this.uvLightAttack());

    this.uvLightText = this.add.text(350, 550, 'UV Light', { fontSize: 20, color: 'rgb(0,0,0)', })
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
      this.virusDamageMessage.text = `You defeat the virus`;
      this.RobotDamageMessage.text = '';
      this.collectVirus();
      this.ContinueButton = this.add.image(240, 550, 'green-button')
        .setScale(0.5)
        .setInteractive()
        .on('pointerdown', () => this.continueGame());

      this.continueText = this.add.text(240, 550, 'Continue', { fontSize: 20, color: 'rgb(0,0,0)', })
        .setOrigin(0.5);
    }
    else {
      this.RobotDamageMessage.text = '';
      this.virusDamageMessage.text = `You made ${points} points of damage`;
      this.sleep(2000).then(() => { this.virusAttackOp(); });
    }
  }

  collectVirus() {
    window.virusCollected += 1;
  }

  soapAttack() {
    this.disableButtons()
    this.virusHealthSubs(this.soap);
    this.playerWin(this.soap);
  }


  chlorineAttack() {
    this.disableButtons()
    this.virusHealthSubs(this.chlorine);
    this.playerWin(this.chlorine);
  }

  uvLightAttack() {
    this.disableButtons()
    this.virusHealthSubs(this.uvLight);
    this.playerWin(this.uvLight)
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
    this.robotHealthSubs(this.virusAttack);
    this.RobotDamageMessage.text = `You receive ${this.virusAttack} points of damage`;
    this.virusDamageMessage.text = 'Your turn';
    this.enableButtons();
  }

  robotHealthSubs(value) {
    window.robotHealth -= value;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  defeatVirus() {
    if (this.virusHealth <= 0) {
      return true
    }
    else {
      return false
    }
  }

  gameOver() {
    if (window.robotHealth <= 0) {
      return true
    }
    else {
      return false
    }
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

}

// CONCATENATED MODULE: ./src/index.js













/* harmony default export */ var src = __webpack_exports__["default"] = (new phaser.Game({
  type: phaser.AUTO,
  width: 480,
  height: 640,
  scene: [Start_Start, Game_Game, GameOver_GameOver, RpgPlayer_RpgPlayer, GameContinue_GameContinue],
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


/***/ })
/******/ ]);