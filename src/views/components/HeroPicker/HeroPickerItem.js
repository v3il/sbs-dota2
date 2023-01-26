import template from './hero-picker-item-template.html?raw';
import { ComponentView } from '../ComponentView';

export class HeroPickerItem extends ComponentView {
    #hero;
    #selectedHero;

    constructor({ hero, selectedHero, parentView }) {
        super({ parentView });

        this.#hero = hero;
        this.#selectedHero = selectedHero;

        this.render();
        this.listenEvents();
    }

    listenEvents() {
        this.el.addEventListener('click', () => this.emit('change', this.#hero));
    }

    render() {
        this.mountElement(template);

        const src = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${this.#hero.id}.png`;
        const imageEl = this.el.querySelector('[data-image]');

        imageEl.src = src;
        imageEl.alt = this.#hero.name;

        this.el.classList.add('hero-selector__item');

        this.#renderActiveState();
    }

    #renderActiveState() {
        this.el.classList.toggle('active', this.#selectedHero === this.#hero);
    }

    setSelectedHero(selectedHero) {
        this.#selectedHero = selectedHero;
        this.#renderActiveState();
    }
}
