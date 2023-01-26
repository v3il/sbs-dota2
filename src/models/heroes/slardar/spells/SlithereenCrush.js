import { ActiveSpell } from '../../../spells/ActiveSpell';

export class SlithereenCrush extends ActiveSpell {
    damage = 100;

    constructor({ character }) {
        super({
            character, manacost: 75, cooldown: 3, id: 'slardar_slithereen_crush'
        });
    }

    invoke(target) {
        target.takePhysicalDamage(this.damage);

        super.invoke();
    }
}
