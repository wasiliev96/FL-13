/* Your code goes here */

//@ts-check

// Fighter default skills values
const DEFAULT_DAMAGE = 25;
const DEFAULT_HP = 100;
const DEFAULT_STRENGTH = 30;
const DEFAULT_AGILITY = 30;

/**
 *
 * @returns {{getDamage: (function(): number), addLoss: addLoss, getName:
 *   (function(): string), attack: attack, getStrength: (function(): number),
 *   getAgility: (function(): number), heal: heal, logCombatHistory:
 *   (function(): string), dealDamage: dealDamage, addWin: addWin, getHealth:
 *   (function(): number), ...}} - returns interface for private method
 * @constructor
 * @param props
 */
function Fighter(props) {
    const _name = props.name || 'No name';
    const _damage = props.damage || DEFAULT_DAMAGE;
    let _hp = props.hp || DEFAULT_HP;
    const _strength = props.strength || DEFAULT_STRENGTH;
    const _agility = props.agility || DEFAULT_AGILITY;
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
    const getHistory = () => {
        return `Name: '${getName()}', Wins: ${history[0]}, Losses: ${history[1]}`;
    };

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
        const successChance = MAX_CHANCE -
            (enemy.getStrength() + enemy.getAgility());
        const random = Math.random() * (+MAX_CHANCE - +MIN_CHANCE) + +MIN_CHANCE;
        if (random < successChance) {
            enemy.dealDamage(getDamage());
            if (enemy.getHealth() > 0) {
                console.log(
                    `${getName()} makes ${getDamage()} damage to ${enemy.getName()}`);
            }
        } else {
            console.log(`${enemy.getName()} attack missed`);
        }
    };

    /**
     * increase _hp by value, until equals 100
     * @param {number} value
     */
    const heal = (value) => {
        _hp += value;
        _hp = _hp > DEFAULT_HP ? DEFAULT_HP : _hp;
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

/**
 * Run death match
 * @param {object } fighter1
 * @param {object} fighter2
 */
const battle = (fighter1, fighter2) => {
    if (fighter1.getHealth() <= 0) {
        console.log(`${fighter1.getName()} is dead and can't fight`);
        return;
    }
    if (fighter2.getHealth() <= 0) {
        console.log(`${fighter2.getName()} is dead and can't fight`);
        return;
    }
    fighter1.attack(fighter2);
    if (fighter2.getHealth() <= 0) {
        fighter1.addWin();
        fighter2.addLoss();
        console.log(`${fighter1.getName()} wins!`);
        return;
    }
    battle(fighter2, fighter1);
};

const fighter1 = new Fighter({name: 'Maximus', damage: 20, strength: 20, agility: 15, hp: 100});
const fighter2 = new Fighter({name: 'Commodus', damage: 25, strength: 25, agility: 20, hp: 90});
battle(fighter1, fighter2);