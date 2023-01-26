import { PassiveSpell } from '../../../spells/PassiveSpell';
import { CriticalHitModifier } from '../../../modifiers';
import { HeroConfig } from '../HeroConfig';
import { Effect } from '../../../effects';

export class CoupDeGrace extends PassiveSpell {
    constructor({ character }) {
        super({ character, id: 'phantom_assassin_coup_de_grace' });
    }

    applyEffect() {
        const modifier = CriticalHitModifier.create({
            chance: HeroConfig.COUP_DE_GRACE_CRIT_CHANCE,
            multiplier: HeroConfig.COUP_DE_GRACE_CRIT_MULTIPLIER
        });

        this.character.addEffect(Effect.createPositive({
            apply: (target) => target.addAttackModifier(modifier),
            remove: (target) => target.removeAttackModifier(modifier),
            spellId: this.id,
            description: 'Each attack has a chance to deal critical damage'
        }));
    }
}
