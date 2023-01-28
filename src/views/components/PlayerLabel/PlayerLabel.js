import './styles.scss';
import { game } from '../../../models';
import { ComponentView } from '../ComponentView';

export class PlayerLabel extends ComponentView {
    player;

    constructor({ player, parentView, el }) {
        super({ parentView, el });

        this.player = player;

        this.render();
    }

    listenEvents() {
        game.events.on('playerChanged', () => this.#updateView());
    }

    render() {
        super.render('<div class="active-player-label">Current player</div>');
        this.listenEvents();
        this.#updateView();
    }

    #updateView() {
        this.#toggleLabel();
        this.#renderContent();
    }

    #toggleLabel() {
        const isCurrentPlayer = game.isCurrentPlayer(this.player) && !game.gameEnded;
        const isWinner = game.winner === this.player;

        this.el.style.display = isCurrentPlayer || isWinner ? 'block' : 'none';
    }

    #renderContent() {
        const isCurrentPlayer = game.isCurrentPlayer(this.player) && !game.gameEnded;
        const isWinner = game.winner === this.player;

        if (isWinner) {
            this.el.textContent = 'Winner';
        } else if (isCurrentPlayer) {
            this.el.textContent = 'Current player';
        }
    }
}
