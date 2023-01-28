import template from './hero-picker-item-template.html?raw';
import { ComponentView } from '../ComponentView';
import { DotaAssetUrlManager } from '../../../services/DotaAssetUrlManager';

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

        const imageEl = this.el.querySelector('[data-image]');

        imageEl.src = DotaAssetUrlManager.getHeroImageUrl(this.#hero.id);
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
