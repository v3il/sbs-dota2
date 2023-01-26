import { ActiveSpell } from '../../../spells/ActiveSpell';

export class PowerCogs extends ActiveSpell {
    damage = 50;
    manaBurnValue = 50;

    constructor({ character }) {
        super({
            character, manacost: 50, cooldown: 4, id: 'rattletrap_power_cogs'
        });
    }

    invoke(target) {
        target.takeMagicalDamage(this.damage);
        target.decreaseMana(this.manaBurnValue);

        super.invoke();
    }
}
