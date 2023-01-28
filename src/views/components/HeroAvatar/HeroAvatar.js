import './styles.scss';
import { ComponentView } from '../ComponentView';
import { DotaAssetUrlManager } from '../../../services/DotaAssetUrlManager';

export class HeroAvatar extends ComponentView {
    hero;
    player;

    constructor({
        hero, player, parentView, el
    }) {
        super({ parentView, el });

        this.hero = hero;
        this.player = player;

        console.error(this.hero);
        console.error(this.player);

        this.render();
    }

    render() {
        this.mountElement('<div class="hero-avatar"></div>');

        const isRadiantPlayer = this.player.isRadiant;
        const isLeftDirection = this.hero.isLeftAvatarDirection;
        const isReversedAvatar = (isRadiantPlayer && isLeftDirection) || (!isRadiantPlayer && !isLeftDirection);

        this.el.style.setProperty('--url', `url("${DotaAssetUrlManager.getHeroAvatarUrl(this.hero.id)}")`);
        this.el.classList.toggle('reverse', isReversedAvatar);
    }
}
