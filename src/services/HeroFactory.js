import {
    vengefulSpiritSettings, VengefulSpirit,
    slardarSettings, Slardar,
    clockwerkSettings, Clockwerk,
    phantomAssassinSettings, PhantomAssassin
} from '../models/heroes';

import { EventEmitter } from '../models/EventEmitter';
import { HeroIds } from '../consts/HeroIds';

export class HeroFactory {
    get availableHeroes() {
        return [
            vengefulSpiritSettings,
            slardarSettings,
            clockwerkSettings,
            phantomAssassinSettings
        ];
    }

    createHero(heroId) {
        const events = new EventEmitter();

        switch (heroId) {
        case HeroIds.VENGEFUL_SPIRIT: return VengefulSpirit.create({ events });
        case HeroIds.PHANTOM_ASSASSIN: return PhantomAssassin.create({ events });
        case HeroIds.SLARDAR: return Slardar.create({ events });
        case HeroIds.CLOCKWERK: return Clockwerk.create({ events });
        default: throw Error('Such hero does not exist');
        }
    }
}
