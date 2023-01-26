import './styles.scss';
import { game } from '../../../models';
import { ComponentView } from '../ComponentView';

export class WinnerLabel extends ComponentView {
    player;

    constructor({ player, parentView, el }) {
        super({ parentView, el });

        this.player = player;

        this.render();
    }

    listenEvents() {
        game.events.on('gameEnded', () => this.toggleLabel());
    }

    render() {
        this.mountElement('<div class="active-player-label">Winner!</div>');
        this.listenEvents();
        this.toggleLabel();
    }

    toggleLabel() {
        this.el.style.display = this.player === game.winner ? 'block' : 'none';
    }
}
