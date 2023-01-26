import { ActiveSpell } from '../../../spells/ActiveSpell';
import { Effect } from '../../../effects';

export class Hookshot extends ActiveSpell {
    damage = 100;

    constructor({ character }) {
        super({
            character, manacost: 100, cooldown: 5, id: 'rattletrap_hookshot'
        });
    }

    invoke(enemyHero) {
        enemyHero.takeMagicalDamage(this.damage);

        enemyHero.addEffect(Effect.createNegative({
            apply: (target) => target.setSilenced(true),
            remove: (target) => target.setSilenced(false),
            spellId: this.id,
            duration: 2,
            description: 'Hero is silenced'
        }));

        super.invoke();
    }
}
