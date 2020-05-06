/* Your code goes here */

//@ts-check

/**
 *
 * @param {string} name -
 * @param {number} damage
 * @param {number} hp
 * @param {number} strength
 * @param {number} agility
 * @returns {{getDamage: (function(): number), getName: (function(): string),
 *   attack: attack, getStrength: (function(): number), getAgility:
 *   (function(): number), getHealth: (function(): number)}} - returns
 *   interface for private method
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
   * @type {number[]} [wins, loses]
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
  const setHealth = (value) => {_hp = value;};
  const getHistory = () => {return `Name: ${ getName() }, Wins: ${ history[0] }, Loses: ${ history[1] }`;};

  const updateHistory = (result) => {
    result ? history[0]++ : history[1]++;
  };

  /**
   * attack enemy with weighted random chance depends on
   * fighter's strength+agility
   * @param {object} enemy
   */
  const attack = (enemy) => {
    const MAX_CHANCE = 100;
    const MIN_CHANCE = 0;
    const successChance = 100 - (enemy.getStrength() + enemy.getAgility());/*?*/
    const random = Math.random() * (+MAX_CHANCE - +MIN_CHANCE) + +MIN_CHANCE;/*?*/
    if (random < successChance) {
      enemy.setHealth(enemy.getHealth() - getDamage());
      if (enemy.getHealth() > 0) {
        console.log(
          `${ getName() } makes ${ getDamage() } damage to ${ enemy.getName() }`);
      } else {
        updateHistory(true);
        enemy.updateHistory(false);
        console.log(`${ getName() } has won!`);
      }
    } else {
      console.log(`${ enemy.getName() } attack missed`);
    }
  };
  const logCombatHistory = () => {

  };
  return {
    getName: getName,
    getDamage: getDamage,
    getStrength: getStrength,
    getAgility: getAgility,
    getHealth: getHealth,
    setHealth: setHealth,
    attack: attack,
    getHistory: getHistory,
    updateHistory: updateHistory
  };
}

const myFighter = new Fighter('Helga');/*?*/
const enemyFighter = new Fighter('Thor');
myFighter.attack(enemyFighter);
