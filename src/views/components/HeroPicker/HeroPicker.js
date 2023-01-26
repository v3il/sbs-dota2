import { HeroPickerItem } from './HeroPickerItem';
import { ComponentView } from '../ComponentView';

export class HeroPicker extends ComponentView {
    #availableHeroes;
    #selectedHero;

    constructor({ availableHeroes, parentView, el }) {
        super({ parentView, el });

        this.#availableHeroes = availableHeroes;
        this.#selectedHero = availableHeroes.at(0);

        this.render();
    }

    get selectedHero() {
        return this.#selectedHero;
    }

    render() {
        const views = this.#availableHeroes.map((heroSettings) => {
            const heroPickerItem = new HeroPickerItem({
                hero: heroSettings,
                selectedHero: this.#selectedHero,
                parentView: this
            });

            this.el.appendChild(heroPickerItem.el);

            heroPickerItem.on('change', (selectedHero) => {
                this.#selectedHero = selectedHero;
                views.forEach((view) => view.setSelectedHero(selectedHero));
                this.emit('change', this.#selectedHero);
            });

            return heroPickerItem;
        });
    }
}
