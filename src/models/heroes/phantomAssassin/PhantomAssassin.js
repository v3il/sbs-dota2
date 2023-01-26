import { BasicHero } from '../BasicHero';
import { phantomAssassinSettings } from './phantomAssassinSettings';
import {
    StiflingDagger, Blur, PhantomStrike, CoupDeGrace
} from './spells';

export class PhantomAssassin extends BasicHero {
    constructor({ events }) {
        super(phantomAssassinSettings, events);

        this.setSpells([
            StiflingDagger.create({ character: this }),
            PhantomStrike.create({ character: this }),
            Blur.create({ character: this }),
            CoupDeGrace.create({ character: this })
        ]);
    }
}
