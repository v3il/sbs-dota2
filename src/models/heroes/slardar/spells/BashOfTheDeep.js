import { PassiveSpell } from '../../../spells/PassiveSpell';
import { BashOfTheDeepModifier } from '../../../modifiers';
import { Effect } from '../../../effects';

export class BashOfTheDeep extends PassiveSpell {
    constructor({ character }) {
        super({ character, id: 'slardar_bash' });
    }

    applyEffect() {
        const modifier = BashOfTheDeepModifier.create();

        this.character.addEffect(Effect.createPositive({
            apply: (target) => target.addAttackModifier(modifier),
            remove: (target) => target.removeAttackModifier(modifier),
            spellId: this.id,
            description: 'Each 4th attack deals more damage'
        }));
    }
}
