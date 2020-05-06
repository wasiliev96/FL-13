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
 *   interfaces for private methods
 * @constructor
 */
function Fighter (name = 'Great Unnamed', damage = 25, hp = 100,
  strength = 30, agility = 30) {
  const _name = name;
  const _damage = damage;
  const _hp = hp;
  const _strength = strength;
  const _agility = agility;

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
   * attack enemy with weighted random chance depends on
   * fighter's strength+agility
   * @param {object} enemy
   */
  function attack (enemy) {
    const weights = [this.getStrength() + this.getAgility()];/*?*/
    console.log(weights);/*?*/
  }

  return {
    getName: getName,
    getDamage: getDamage,
    getStrength: getStrength,
    getAgility: getAgility,
    getHealth: getHealth,
    attack: attack
  };
}

const myFighter = new Fighter();/*?*/
console.log(myFighter.getAgility());/*?*/
myFighter.attack();
