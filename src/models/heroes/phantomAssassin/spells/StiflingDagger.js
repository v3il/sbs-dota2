import { ActiveSpell } from '../../../spells/ActiveSpell';
import { CriticalHitModifier } from '../../../modifiers';
import { HeroConfig } from '../HeroConfig';

export class StiflingDagger extends ActiveSpell {
    damage = 30;

    constructor({ character }) {
        super({
            character,
            manacost: 30,
            cooldown: 2,
            id: 'phantom_assassin_stifling_dagger'
        });
    }

    invoke(target) {
        const modifier = CriticalHitModifier.create({
            chance: HeroConfig.COUP_DE_GRACE_CRIT_CHANCE,
            multiplier: HeroConfig.COUP_DE_GRACE_CRIT_MULTIPLIER
        });

        target.takePhysicalDamage(modifier.applyModifier(this.damage));
        super.invoke();
    }
}
