import { AttackModifier } from './AttackModifier';

export class CriticalHitModifier extends AttackModifier {
    static create({ chance, multiplier }) {
        return new CriticalHitModifier({ chance, multiplier });
    }

    chance = 0;
    multiplier = 0;

    constructor({ chance, multiplier }) {
        super();

        this.chance = chance;
        this.multiplier = multiplier;
    }

    applyModifier(baseDamage) {
        return Math.random() < this.chance ? baseDamage * this.multiplier : baseDamage;
    }
}
