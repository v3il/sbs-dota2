import './styles.scss';
import { ComponentView } from '../ComponentView';

export class TeamLabel extends ComponentView {
    isRadiant;
    title;

    constructor({
        isRadiant, title, parentView, el
    }) {
        super({ parentView, el });

        this.isRadiant = isRadiant;
        this.title = title;

        this.render();
    }

    render() {
        this.mountElement('<p class="team-label"></p>');

        this.el.textContent = this.title;
        this.el.classList.toggle('radiant', this.isRadiant);
        this.el.classList.toggle('dire', !this.isRadiant);
    }
}
