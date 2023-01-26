import template from './template.html?raw';
import { HeroStats } from '../HeroStats/HeroStats';
import { ComponentView } from '../ComponentView';
import './styles.scss';
import { ActivePlayerLabel } from '../activePlayerLabel/ActivePlayerLabel';
import { WinnerLabel } from '../WinnerLabel/WinnerLabel';
import { TeamLabel } from '../TeamLabel/TeamLabel';
import { HeroAvatar } from '../HeroAvatar/HeroAvatar';
import { EffectsPanel } from '../EffectsView/EffectsPanel';
import { SpellButton } from '../SpellButton/SpellButton';
import { AttackButton } from '../AttackButton/AttackButton';
import { ProgressBar } from '../ProgressBar/ProgressBar';

export class PlayerView extends ComponentView {
    #player;

    constructor({ player, parentView, el }) {
        super({ parentView, el });

        this.#player = player;

        this.render();
    }

    render() {
        this.mountElement(template);

        const player = this.#player;
        const { hero } = this.#player;

        new ActivePlayerLabel({
            player,
            parentView: this,
            el: this.el.querySelector('[data-active-player-label]')
        });

        new WinnerLabel({
            player,
            parentView: this,
            el: this.el.querySelector('[data-winner-label]')
        });

        new TeamLabel({
            isRadiant: player.isRadiant,
            title: `${player.name}: ${player.isRadiant ? 'Radiant' : 'Dire'}`,
            el: this.el.querySelector('[data-player-name]'),
            parentView: this
        });

        new HeroAvatar({
            player,
            hero,
            parentView: this,
            el: this.el.querySelector('[data-hero-avatar]')
        });

        new EffectsPanel({
            hero,
            el: this.el.querySelector('[data-effects]'),
            parentView: this
        });

        hero.spells.forEach((spell, index) => {
            new SpellButton({
                spell,
                player,
                parentView: this,
                el: this.el.querySelector(`[data-spell="${index}"]`)
            });
        });

        new AttackButton({
            hero,
            parentView: this,
            el: this.el.querySelector('[data-attack-button]')
        });

        new HeroStats({
            hero,
            parentView: this,
            el: this.el.querySelector('[data-hero-stats]')
        });

        const hpProgressBar = new ProgressBar({
            value: hero.hitPoints,
            maxValue: hero.maxHitPoints,
            parentView: this,
            el: this.el.querySelector('[data-hp]'),
            classes: ['hit-points-bar']
        });

        const manaProgressBar = new ProgressBar({
            value: hero.manaPoints,
            maxValue: hero.maxManaPoints,
            parentView: this,
            el: this.el.querySelector('[data-mana]'),
            classes: ['mana-points-bar']
        });

        hero.events.on('change:hitPoints', () => hpProgressBar.setValue(hero.hitPoints));
        hero.events.on('change:manaPoints', () => manaProgressBar.setValue(hero.manaPoints));
    }
}
