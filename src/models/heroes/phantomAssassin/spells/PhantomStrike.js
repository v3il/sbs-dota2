import { ActiveSpell } from '../../../spells/ActiveSpell';
import { promisifiedSetTimeout } from '../../../../utils/promisifiedSetTimeout';

export class PhantomStrike extends ActiveSpell {
    constructor({ character }) {
        super({
            character, manacost: 30, cooldown: 4, id: 'phantom_assassin_phantom_strike'
        });
    }

    async invoke(target) {
        await promisifiedSetTimeout(500);

        for (let strike = 0; strike < 3; strike++) {
            await promisifiedSetTimeout(500);
            target.decreaseArmor(1);
            this.character.attack(target);
            this.character.increaseHitPoints(10);
        }

        target.increaseArmor(3);
        super.invoke();
    }
}
