import './styles.scss';
import { game } from '../../../models';
import { ComponentView } from '../ComponentView';

export class ActivePlayerLabel extends ComponentView {
    player;

    constructor({ player, parentView, el }) {
        super({ parentView, el });

        this.player = player;

        this.render();
    }

    listenEvents() {
        game.events.on('playerChanged', () => this.toggleLabel());
    }

    render() {
        super.render('<div class="active-player-label">Current player</div>');
        this.listenEvents();
        this.toggleLabel();
    }

    toggleLabel() {
        this.el.style.display = this.player === game.currentPlayer && !game.gameEnded ? 'block' : 'none';
    }
}
