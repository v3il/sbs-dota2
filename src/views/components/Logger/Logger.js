import './styles.scss';
import { game } from '../../../models';
import { ComponentView } from '../ComponentView';

export class Logger extends ComponentView {
    constructor({ parentView, el }) {
        super({ parentView, el });
        this.render();
    }

    listenEvents() {
        game.events.on('roundChanged', () => this.#renderNextRound());
        game.events.on('gameEnded', (data) => this.#renderWinner(data));

        game.radiantPlayer.hero.events.on('attack', (data) => this.#renderAttack(data));
        game.radiantPlayer.hero.events.on('useSpell', (data) => this.#renderSpell(data));
        game.radiantPlayer.hero.events.on('damage', (data) => this.#renderDamage(data));
        game.radiantPlayer.hero.events.on('miss', (data) => this.#renderMiss(data));

        game.direPlayer.hero.events.on('attack', (data) => this.#renderAttack(data));
        game.direPlayer.hero.events.on('useSpell', (data) => this.#renderSpell(data));
        game.direPlayer.hero.events.on('damage', (data) => this.#renderDamage(data));
        game.direPlayer.hero.events.on('miss', (data) => this.#renderMiss(data));
    }

    render() {
        this.mountElement('<ul class="logger"></ul>');
        this.listenEvents();
        this.#renderNextRound();
    }

    #renderItem(template) {
        this.el.insertAdjacentHTML('beforeend', template);
        this.el.scrollTop = this.el.scrollHeight;
    }

    #renderNextRound() {
        if (game.gameEnded) { return; }

        this.#renderItem(`<li class="logger__item logger__item--round">Round: ${game.round}</li>`);
    }

    #renderSpell({ source, spell }) {
        this.#renderItem(`<li class="logger__item">${source.name} used spell ${spell.id}</li>`);
    }

    #renderAttack({ source, target }) {
        this.#renderItem(`<li class="logger__item">${source.name} attacks ${target.name}</li>`);
    }

    #renderMiss({ source }) {
        this.#renderItem(`<li class="logger__item">${source.name} missed</li>`);
    }

    #renderWinner({ winner }) {
        this.#renderItem(`
            <li class="logger__item logger__item--winner">
                ${winner.name} (${winner.hero.name}, ${winner.team}) has won, grats
            </li>
        `);
    }

    #renderDamage({
        target, damage, resultDamage, type
    }) {
        this.#renderItem(`
            <li class="logger__item">
                ${target.name} has taken ${damage} [${resultDamage}] points of ${type} damage
            </li>
        `);
    }
}
