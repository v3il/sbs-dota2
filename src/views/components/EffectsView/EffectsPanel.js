import './styles.scss';
import { EffectView } from './EffectView';
import { ComponentView } from '../ComponentView';

export class EffectsPanel extends ComponentView {
    hero;

    constructor({ hero, parentView, el }) {
        super({ parentView, el });

        this.hero = hero;

        this.render();
    }

    listenEvents() {
        this.hero.events.on('effect:add', ({ effect }) => this.#onEffectAdded(effect));
        this.hero.events.on('effect:remove', ({ effect }) => this.#onEffectRemoved(effect));
    }

    #onEffectAdded(effect) {
        const container = document.createElement('div');

        this.el.appendChild(container);

        new EffectView({
            effect,
            parentView: this,
            el: container
        });
    }

    #onEffectRemoved(effect) {
        this.el.querySelector(`[data-id="${effect.id}"]`).remove();
    }

    render() {
        this.mountElement('<div class="effects-panel" />');
        this.hero.effects.forEach((effect) => this.#onEffectAdded(effect));
        this.listenEvents();
    }
}
