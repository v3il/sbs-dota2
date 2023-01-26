import { ActiveSpell } from '../../../spells/ActiveSpell';

export class RocketFlare extends ActiveSpell {
    damage = 50;

    constructor({ character }) {
        super({
            character, manacost: 50, cooldown: 2, id: 'rattletrap_rocket_flare'
        });
    }

    invoke(target) {
        target.takeMagicalDamage(this.damage);

        super.invoke();
    }
}
