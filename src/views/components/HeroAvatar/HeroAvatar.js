import './styles.scss';
import { ComponentView } from '../ComponentView';

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

        // eslint-disable-next-line max-len
        const url = `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${this.hero.id}.png`;

        this.el.style.setProperty('--url', `url("${url}")`);
        this.el.classList.toggle('reverse', isReversedAvatar);
    }
}
