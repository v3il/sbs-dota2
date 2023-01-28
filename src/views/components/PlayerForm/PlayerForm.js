import template from './template.html?raw';
import { HeroStats } from '../HeroStats/HeroStats';
import { HeroPicker } from '../HeroPicker/HeroPicker';
import { heroFactory } from '../../../services';
import { ComponentView } from '../ComponentView';
import './styles.scss';

export class PlayerForm extends ComponentView {
    #player;

    constructor({ player, parentView, el }) {
        super({ parentView, el });

        this.#player = player;

        this.render();
    }

    render() {
        this.mountElement(template);

        const isRadiantPlayer = this.#player.isRadiant;

        const titleEl = this.el.querySelector('[data-title]');
        titleEl.textContent = isRadiantPlayer ? 'Radiant' : 'Dire';
        titleEl.classList.add(isRadiantPlayer ? 'red' : 'blue');

        const nameInputEl = this.el.querySelector('[data-player-name]');
        nameInputEl.value = `Player ${isRadiantPlayer ? 1 : 2}`;

        const heroPicker = new HeroPicker({
            availableHeroes: heroFactory.availableHeroes,
            parentView: this,
            el: this.el.querySelector('[data-hero-selector]')
        });

        const heroStats = new HeroStats({
            hero: heroPicker.selectedHero,
            el: this.el.querySelector('[data-hero-stat]'),
            parentView: this,
            classes: ['offset-bottom24']
        });

        heroPicker.on('change', (selectedHero) => heroStats.setHero(selectedHero));

        const confirmButtonEl = this.el.querySelector('[data-confirm]');

        confirmButtonEl.addEventListener('click', () => {
            const name = nameInputEl.value.trim();
            const hero = heroFactory.createHero(heroPicker.selectedHero.id);

            this.#player.setName(name);
            this.#player.setHero(hero);

            confirmButtonEl.disabled = true;
            confirmButtonEl.textContent = 'Confirmed';

            this.emit('selected');
        });
    }
}
