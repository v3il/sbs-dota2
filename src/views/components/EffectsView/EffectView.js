import { ComponentView } from '../ComponentView';

export class EffectView extends ComponentView {
    effect;

    constructor({ effect, parentView, el }) {
        super({ parentView, el });

        this.effect = effect;

        this.render();
    }

    listenEvents() {
        this.effect.events.on('durationChanged', () => this.renderDuration());
    }

    render() {
        this.mountElement(`
            <div class="effect-view">
                <span data-effect-duration class="effect-view__duration">
            </div>
        `);

        // eslint-disable-next-line max-len
        const imageSrc = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${this.effect.spellId}.png`;

        this.el.dataset.id = this.effect.id;
        this.el.classList.toggle('effect-view--positive', this.effect.isPositive);
        this.el.classList.toggle('effect-view--negative', !this.effect.isPositive);
        this.el.style.setProperty('--url', `url(${imageSrc})`);
        this.el.title = this.effect.description;

        this.el.querySelector('[data-effect-duration]').style.display = this.effect.isPersistent ? 'none' : 'block';

        this.renderDuration();
        this.listenEvents();
    }

    renderDuration() {
        this.el.querySelector('[data-effect-duration]').textContent = this.effect.currentDuration;
    }
}
