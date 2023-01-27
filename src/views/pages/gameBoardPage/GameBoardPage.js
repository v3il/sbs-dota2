import { PageView } from '../PageView';
import template from './template.html?raw';
import './style.css';
import { game } from '../../../models';
import { PlayerView } from '../../components/PlayerView/PlayerView';
import { Logger } from '../../components/Logger/Logger';

export class GameBoardPage extends PageView {
    constructor() {
        super(template);
    }

    render(mountingEl) {
        super.render(mountingEl);

        new PlayerView({
            player: game.radiantPlayer,
            parentView: this,
            el: mountingEl.querySelector('[data-radiant-player-view]')
        });

        new PlayerView({
            player: game.direPlayer,
            parentView: this,
            el: mountingEl.querySelector('[data-dire-player-view]')
        });

        new Logger({
            el: mountingEl.querySelector('[data-logger]'),
            parentView: this
        });
    }
}
