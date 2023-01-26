import { PassiveSpell } from '../../../spells/PassiveSpell';
import { Effect } from '../../../effects';

export class Blur extends PassiveSpell {
    constructor({ character }) {
        super({ character, id: 'phantom_assassin_blur' });
    }

    applyEffect() {
        const bonusEvasion = 0.25;

        this.character.addEffect(Effect.createPositive({
            apply: (target) => target.increaseEvasion(bonusEvasion),
            remove: (target) => target.decreaseEvasion(bonusEvasion),
            spellId: this.id,
            description: 'Evasion increased by 25%'
        }));
    }
}
