import { ActiveSpell } from '../../../spells/ActiveSpell';
import { promisifiedSetTimeout } from '../../../../utils/promisifiedSetTimeout';

export class BatteryAssault extends ActiveSpell {
    damage = 12;

    constructor({ character }) {
        super({
            character, manacost: 50, cooldown: 4, id: 'rattletrap_battery_assault'
        });
    }

    async invoke(target) {
        for (let strike = 0; strike < 5; strike++) {
            await promisifiedSetTimeout(500);
            target.takeMagicalDamage(this.damage + strike * 3);
        }

        super.invoke();
    }
}
