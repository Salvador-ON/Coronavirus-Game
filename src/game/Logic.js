export default class Logic {

  static validateData(name) {
    const nameLength = name;
    if (nameLength >= 3 && nameLength < 10) {
      return true;
    }
    return false;
  }

  static capitalize(s) {
    if (typeof s !== 'string') return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  static collectVirus() {
    window.virusCollected += 1;
  }

  static robotHealthSubs(value) {
    window.robotHealth -= value;

    if (window.robotHealth < 0) {
      window.robotHealth = 0;
    }
  }

  static defeatVirus(virusHealth) {
    if (virusHealth <= 0) {
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

  static sumRobotHealth(){
    window.robotHealth += 3
  }

}