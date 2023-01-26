import { AttackModifier } from './AttackModifier';

export class BashOfTheDeepModifier extends AttackModifier {
    static create() {
        return new BashOfTheDeepModifier();
    }

    hit = 0;

    applyModifier(baseDamage) {
        if (this.hit === 3) {
            this.hit = 0;
            return baseDamage + 100;
        }

        this.hit++;

        return baseDamage;
    }
}
