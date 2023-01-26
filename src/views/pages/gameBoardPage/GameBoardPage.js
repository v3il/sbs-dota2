import { PageView } from '../PageView';
import template from './template.html?raw';
import './style.css';
import { game } from '../../../models';
import { PlayerView } from '../../components/PlayerView/PlayerView';

export class GameBoardPage extends PageView {
    constructor() {
        super(template);
    }

    render(mountingEl) {
        super.render(mountingEl);

        const radiantPlayerForm = new PlayerView({
            player: game.radiantPlayer,
            parentView: this,
            el: mountingEl.querySelector('[data-radiant-player-view]')
        });

        const direPlayerForm = new PlayerView({
            player: game.direPlayer,
            parentView: this,
            el: mountingEl.querySelector('[data-dire-player-view]')
        });

        // radiantPlayerForm.on('selected', () => this.#checkPlayersReady());
        // direPlayerForm.on('selected', () => this.#checkPlayersReady());
    }
}
