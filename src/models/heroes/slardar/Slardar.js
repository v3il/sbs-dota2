import { BasicHero } from '../BasicHero';
import { slardarSettings } from './slardarSettings';
import {
    GuardianSprint, BashOfTheDeep, CorrosiveHaze, SlithereenCrush
} from './spells';

export class Slardar extends BasicHero {
    constructor({ events }) {
        super(slardarSettings, events);

        this.setSpells([
            GuardianSprint.create({ character: this }),
            SlithereenCrush.create({ character: this }),
            BashOfTheDeep.create({ character: this }),
            CorrosiveHaze.create({ character: this })
        ]);
    }
}
