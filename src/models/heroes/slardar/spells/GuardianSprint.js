import { ActiveSpell } from '../../../spells/ActiveSpell';
import { Effect } from '../../../effects';

export class GuardianSprint extends ActiveSpell {
    constructor({ character }) {
        super({
            character, manacost: 25, cooldown: 5, id: 'slardar_sprint'
        });
    }

    invoke(enemyHero) {
        this.character.addEffect(Effect.createPositive({
            apply: (target) => target.increaseArmor(5),
            remove: (target) => target.decreaseArmor(5),
            spellId: this.id,
            duration: 2,
            description: 'Armor is increased by 5'
        }));

        super.invoke();
    }
}
