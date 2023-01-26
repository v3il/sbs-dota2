import { ActiveSpell } from '../../../spells/ActiveSpell';
import { Effect } from '../../../effects';

export class CorrosiveHaze extends ActiveSpell {
    constructor({ character }) {
        super({
            character, manacost: 25, cooldown: 5, id: 'slardar_amplify_damage'
        });
    }

    invoke(enemyHero) {
        enemyHero.addEffect(Effect.createNegative({
            apply: (target) => target.decreaseArmor(4),
            remove: (target) => target.increaseArmor(4),
            spellId: this.id,
            duration: 3,
            description: 'Armor is reduced by 4'
        }));

        super.invoke();
    }
}
