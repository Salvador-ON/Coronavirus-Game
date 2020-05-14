import Phaser from '../lib/phaser';

export default class Virus extends Phaser.Physics.Arcade.Sprite {
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
