import './styles.scss';
import { game } from '../../../models';
import { View } from '../../View';
import { ComponentView } from '../ComponentView';

export class SpellButton extends ComponentView {
    spell;
    player;

    constructor({
        spell, player, parentView, el
    }) {
        super({ parentView, el });

        this.spell = spell;
        this.player = player;

        this.render();
    }

    listenEvents() {
        if (this.spell.isActive) {
            this.el.addEventListener('click', () => game.useSpell(this.spell));
            game.events.on('roundChanged', () => this.updateCooldownCounter());
        }

        game.events.on('playerChanged', () => {
            this.toggleLock();
            this.updateCooldownCounter();
        });
    }

    render() {
        this.mountElement(`
            <button class="spell-button">
                <img class="spell-button__image" data-spell-image>
                <span class="spell-button__manacost" data-spell-manacost></span>
                <div class="spell-button__cooldown" data-cooldown-counter></div>
            </button>
        `);

        // eslint-disable-next-line max-len
        const imageSrc = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${this.spell.id}.png`;
        this.el.querySelector('[data-spell-image]').src = imageSrc;

        if (this.spell.isActive) {
            this.el.querySelector('[data-spell-manacost]').textContent = this.spell.manacost;
        } else {
            this.el.querySelector('[data-spell-manacost]').style.display = 'none';
        }

        this.listenEvents();
        this.toggleLock();
        this.updateCooldownCounter();
    }

    toggleLock() {
        const isCurrentPlayer = game.isCurrentPlayer(this.player);
        const hasEnoughMana = this.spell.isActive ? this.spell.hasEnoughMana : true;
        const isOnCooldown = this.spell.isActive ? this.spell.isOnCooldown : false;
        const { isSilenced } = this.player.hero;

        console.error(this.spell.id, isCurrentPlayer, hasEnoughMana, isOnCooldown, isSilenced);

        this.el.disabled = !isCurrentPlayer || !hasEnoughMana || game.gameEnded || isOnCooldown || isSilenced;
    }

    updateCooldownCounter() {
        const counterEl = this.el.querySelector('[data-cooldown-counter]');
        const isOnCooldown = this.spell.isActive && this.spell.isOnCooldown;

        counterEl.textContent = this.spell.currentCooldown;
        counterEl.classList.toggle('hidden', !isOnCooldown);
    }
}
