import './styles.scss';
import { game } from '../../../models';
import { ComponentView } from '../ComponentView';
import template from './template.html?raw';

export class AttackButton extends ComponentView {
    hero;

    constructor({ hero, parentView, el }) {
        super({ parentView, el });

        this.hero = hero;

        this.render();
    }

    listenEvents() {
        this.el.addEventListener('click', () => game.attackEnemyHero());
        game.events.on('playerChanged', () => this.toggleLock());
    }

    render() {
        super.render(template);
        this.listenEvents();
        this.toggleLock();
    }

    toggleLock() {
        this.el.disabled = !game.isCurrentHero(this.hero) || game.gameEnded;
    }
}
