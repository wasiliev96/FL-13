/* Your code goes here */

//@ts-check

/**
 *
 * @param {string} name
 * @param {number} damage
 * @param {number} hp
 * @param {number} strength
 * @param {number} agility
 * @returns {{getDamage: (function(): number), addLoss: addLoss, getName:
 *   (function(): string), attack: attack, getStrength: (function(): number),
 *   getAgility: (function(): number), heal: heal, logCombatHistory:
 *   (function(): string), dealDamage: dealDamage, addWin: addWin, getHealth:
 *   (function(): number), ...}} - returns interface for private method
 * @constructor
 */
function Fighter (name = 'Great Unnamed', damage = 25, hp = 100,
  strength = 30, agility = 30) {
  const _name = name;
  const _damage = damage;
  let _hp = hp;
  const _strength = strength;
  const _agility = agility;
  /**
   *
   * @type {number[]} store fighter battles history [wins, loses]
   */
  let history = [0, 0];

  const getName = () => {
    return _name;
  };
  const getDamage = () => {
    return _damage;
  };
  const getStrength = () => {
    return _strength;
  };
  const getAgility = () => {
    return _agility;
  };
  const getHealth = () => {
    return _hp;
  };
  /**
   *
   * @returns {string} - string representation on win/loses states
   */
  const getHistory = () => {return `Name: '${ getName() }', Wins: ${ history[0] }, Losses: ${ history[1] }`;};

  /**
   *
   * @param {boolean} result - true if win, false if loose
   */
  const updateHistory = (result) => {
    result ? history[0]++ : history[1]++;
  };

  /**
   * attack enemy with weighted random chance depends on
   * Fighter`s  strength+agility
   * @param {object} enemy - Fighter`s object, whose to attack
   */
  const attack = (enemy) => {
    const MAX_CHANCE = 100;
    const MIN_CHANCE = 0;
    const successChance = 100 - (enemy.getStrength() + enemy.getAgility());/*?*/
    const random = Math.random() * (+MAX_CHANCE - +MIN_CHANCE) + +MIN_CHANCE;/*?*/
    if (random < successChance) {
      enemy.dealDamage(getDamage());
      if (enemy.getHealth() > 0) {
        console.log(
          `${ getName() } makes ${ getDamage() } damage to ${ enemy.getName() }`);
      }
    } else {
      console.log(`${ enemy.getName() } attack missed`);
    }
  };

  /**
   * increase _hp by value, until equals 100
   * @param {number} value
   */
  const heal = (value) => {
    _hp += value;
    _hp = _hp > 100 ? 100 : _hp;
  };

  /**
   * decrease _hp by value, until equals zero
   * @param {number} value
   */
  const dealDamage = (value) => {
    _hp -= value;
    _hp = _hp < 0 ? 0 : _hp;
  };
  const addWin = () => {
    updateHistory(true);
  };
  const addLoss = () => {
    updateHistory(false);
  };

  return {
    getName: getName,
    getDamage: getDamage,
    getStrength: getStrength,
    getAgility: getAgility,
    getHealth: getHealth,
    attack: attack,
    heal: heal,
    logCombatHistory: getHistory,
    updateHistory: updateHistory,
    dealDamage: dealDamage,
    addWin: addWin,
    addLoss: addLoss
  };
}

let battle = (fighter1, fighter2) => {
  if (fighter1.getHealth() <= 0) {
    console.log(`${ fighter1.getName() } is dead and can't fight`);
    return;
  }
  if (fighter2.getHealth() <= 0) {
    console.log(`${ fighter2.getName() } is dead and can't fight`);
    return;
  }
  fighter1.attack(fighter2);
  if (fighter2.getHealth() <= 0) {
    fighter1.addWin();
    fighter2.addLoss();
    console.log(`${ fighter1.getName() } wins!`);
    return;
  }
  battle(fighter2, fighter1);
};
const fighter1 = new Fighter('Abram');
const fighter2 = new Fighter('Backham');
battle(fighter1, fighter2);/*?*/
