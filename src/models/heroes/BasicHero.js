import { DamageTypes } from '../../consts/DamageTypes';

const BASE_HIT_POINTS = 150;
const BASE_MANA_POINTS = 100;
const BASE_EVASION = 0;
const BASE_MAGIC_RESISTANCE = 0.25;

export class BasicHero {
    static create({ events }) {
        return new this({ events });
    }

    #id = '';
    #name = '';
    #avatarDirection = 'left';

    #spells = [];
    #effects = [];
    #attackModifiers = [];

    #strength = 0;
    #agility = 0;
    #intelligence = 0;
    #evasion = BASE_EVASION;
    #magicResistance = BASE_MAGIC_RESISTANCE;
    #armor = 0;
    #minDamage = 0;
    #maxDamage = 0;
    #hitPoints = 0;
    #maxHitPoints = 0;
    #manaPoints = 0;
    #maxManaPoints = 0;

    #isSilenced = false;

    #events;

    constructor(attrs, events) {
        const {
            strength, agility, intelligence, minDamage, maxDamage, id, name, avatarDirection, armor
        } = attrs;

        this.#id = id;
        this.#name = name;
        this.#avatarDirection = avatarDirection;

        this.#strength = strength;
        this.#agility = agility;
        this.#intelligence = intelligence;
        this.#minDamage = minDamage;
        this.#maxDamage = maxDamage;
        this.#armor = armor;

        const hitPoints = this.#strength * 20 + BASE_HIT_POINTS;
        const manaPoints = this.#intelligence * 15 + BASE_MANA_POINTS;

        this.#hitPoints = hitPoints;
        this.#maxHitPoints = hitPoints;
        this.#manaPoints = manaPoints;
        this.#maxManaPoints = manaPoints;

        this.#events = events;
    }

    addEffect(effect) {
        this.#effects.push(effect);
        effect.applyEffect(this);
        this.#events.emit('effect:add', { effect });
    }

    removeEffect(effect) {
        this.#effects = this.#effects.filter((e) => e !== effect);
        effect.removeEffect(this);
        this.#events.emit('effect:remove', { effect });
    }

    addAttackModifier(modifier) {
        this.#attackModifiers.push(modifier);
    }

    removeAttackModifier(modifier) {
        this.#attackModifiers = this.#attackModifiers.filter((m) => m !== modifier);
    }

    attack(target) {
        this.#events.emit('attack', { source: this, target });

        const isMiss = target.evasion > Math.random();

        if (isMiss) {
            this.#events.emit('miss', { source: this });
            return;
        }

        const initialDamage = this.getInitialDamage();
        const damage = this.#attackModifiers.reduce((totalDmg, mod) => mod.applyModifier(totalDmg), initialDamage);

        target.takePhysicalDamage(damage);
    }

    async useSpell(spell, target) {
        this.#events.emit('useSpell', {
            source: this, target, spell
        });

        await spell.invoke(target);
    }

    updateState() {
        this.#spells.forEach((spell) => {
            if (spell.isActive && spell.isOnCooldown) {
                spell.decreaseCooldown();
            }
        });

        this.#effects.forEach((effect) => {
            if (effect.isPersistent) {
                return;
            }

            effect.decreaseDuration();

            if (effect.isEnded) {
                this.removeEffect(effect);
            }
        });
    }

    takePhysicalDamage(damage) {
        const reduction = this.#armor * 0.05;
        const resultDamage = Math.floor(damage * (1 - reduction));

        this.decreaseHitPoints(resultDamage);

        this.#events.emit('damage', {
            type: DamageTypes.PHYSICAL, damage, resultDamage, target: this
        });
    }

    takeMagicalDamage(damage) {
        const resultDamage = Math.floor(damage * (1 - this.#magicResistance));

        this.decreaseHitPoints(resultDamage);

        this.#events.emit('damage', {
            type: DamageTypes.MAGICAL, damage, resultDamage, target: this
        });
    }

    takePureDamage(damage) {
        this.decreaseHitPoints(damage);

        this.#events.emit('damage', {
            type: DamageTypes.PURE, damage, resultDamage: damage, target: this
        });
    }

    get isLeftAvatarDirection() {
        return this.#avatarDirection === 'left';
    }

    get isDead() {
        return this.#hitPoints === 0;
    }

    getInitialDamage() {
        const diff = this.#maxDamage - this.#minDamage + 1;
        return Math.floor(this.#minDamage + (Math.random() * diff));
    }

    setSpells(spells) {
        this.#spells = spells;
    }

    increaseHitPoints(delta) {
        this.#hitPoints += delta;
        this.#events.emit('change:hitPoints');
    }

    decreaseHitPoints(delta) {
        this.#hitPoints -= delta;
        this.#hitPoints = Math.floor(Math.max(this.#hitPoints, 0));
        this.#events.emit('change:hitPoints');
    }

    increaseEvasion(delta) {
        this.#evasion += delta;
        this.#events.emit('change:evasion');
    }

    decreaseEvasion(delta) {
        this.#evasion -= delta;
        this.#events.emit('change:evasion');
    }

    increaseArmor(delta) {
        this.#armor += delta;
        this.#events.emit('change:armor');
    }

    decreaseArmor(delta) {
        this.#armor -= delta;
        this.#events.emit('change:armor');
    }

    increaseMana(delta) {
        this.#manaPoints += delta;
        this.#events.emit('change:manaPoints');
    }

    decreaseMana(delta) {
        this.#manaPoints -= delta;
        this.#manaPoints = Math.max(this.#manaPoints, 0);
        this.#events.emit('change:manaPoints');
    }

    setSilenced(value) {
        this.#isSilenced = value;
    }

    get events() {
        return this.#events;
    }

    get spells() {
        return this.#spells;
    }

    get isSilenced() {
        return this.#isSilenced;
    }

    get name() {
        return this.#name;
    }

    get strength() {
        return this.#strength;
    }

    get agility() {
        return this.#agility;
    }

    get intelligence() {
        return this.#intelligence;
    }

    get armor() {
        return this.#armor;
    }

    get hitPoints() {
        return this.#hitPoints;
    }

    get minDamage() {
        return this.#minDamage;
    }

    get maxDamage() {
        return this.#maxDamage;
    }

    get maxHitPoints() {
        return this.#maxHitPoints;
    }

    get manaPoints() {
        return this.#manaPoints;
    }

    get maxManaPoints() {
        return this.#maxManaPoints;
    }

    get evasion() {
        return this.#evasion;
    }

    get effects() {
        return this.#effects;
    }

    get id() {
        return this.#id;
    }
}
