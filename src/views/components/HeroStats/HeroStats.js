import { game } from '../../../models';
import './styles.css';
import template from './template.html?raw';
import { ComponentView } from '../ComponentView';

export class HeroStats extends ComponentView {
    hero;

    constructor({
        hero, parentView, el, classes
    }) {
        super({ parentView, el, classes });

        this.hero = hero;

        this.render();
    }

    listenEvents() {
        game.events.on('playerChanged', () => this.renderStats());
    }

    render() {
        super.render(template);
        this.listenEvents();
        this.renderStats();
    }

    renderStats() {
        this.el.querySelector('[data-strength]').textContent = this.hero.strength;
        this.el.querySelector('[data-agility]').textContent = this.hero.agility;
        this.el.querySelector('[data-intelligence]').textContent = this.hero.intelligence;
        this.el.querySelector('[data-min-damage]').textContent = this.hero.minDamage;
        this.el.querySelector('[data-max-damage]').textContent = this.hero.maxDamage;
        this.el.querySelector('[data-armor]').textContent = this.hero.armor.toFixed(1);
        this.el.querySelector('[data-name]').textContent = this.hero.name;
    }

    setHero(hero) {
        this.hero = hero;
        this.renderStats();
    }
}
