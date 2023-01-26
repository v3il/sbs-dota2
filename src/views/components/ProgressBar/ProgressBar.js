import './styles.scss';
import { ComponentView } from '../ComponentView';

export class ProgressBar extends ComponentView {
    value;
    maxValue;
    #classes;

    constructor({
        value, maxValue, parentView, el, classes
    }) {
        super({ parentView, el, classes });

        this.value = value;
        this.maxValue = maxValue;
        this.#classes = classes;

        this.render();
    }

    get percentValue() {
        return `${(this.value / this.maxValue) * 100}%`;
    }

    render() {
        super.render(`
            <div class="progress-bar">
                <p class="progress-bar__values" data-values />
            </div>
        `);

        this.updatePercentValue();
        this.renderValues();
    }

    updatePercentValue() {
        this.el.style.setProperty('--percent-value', this.percentValue);
    }

    renderValues() {
        this.el.querySelector('[data-values]').textContent = `${this.value} / ${this.maxValue}`;
    }

    setValue(value) {
        this.value = value;
        this.updatePercentValue();
        this.renderValues();
    }
}
