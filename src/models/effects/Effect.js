import { EffectTypes } from '../../consts/EffectTypes';
import { EventEmitter } from '../EventEmitter';
import { EffectPhase } from './EffectPhase';

export class Effect {
    static create({
        apply, remove, duration = null, spellId
    }) {
        return new Effect({
            apply, remove, duration, spellId
        });
    }

    static createPositive({
        apply, remove, duration, spellId, description, phase
    }) {
        return new Effect({
            apply,
            remove,
            duration,
            spellId,
            description,
            phase,
            type: EffectTypes.POSITIVE
        });
    }

    static createNegative({
        apply, remove, duration, spellId, description, phase
    }) {
        return new Effect({
            apply,
            remove,
            duration,
            spellId,
            description,
            phase,
            type: EffectTypes.NEGATIVE
        });
    }

    id;
    apply;
    remove;
    duration;
    spellId;
    type;
    description;
    currentDuration = 0;
    events = new EventEmitter();

    constructor({
        apply, remove, duration, spellId, type, description, phase
    }) {
        this.id = Math.random();
        this.apply = apply;
        this.remove = remove;
        this.duration = duration ?? null;
        this.spellId = spellId;
        this.type = type;
        this.description = description;
        this.phase = phase;
    }

    get isPersistent() {
        return this.duration === null;
    }

    get isEnded() {
        return this.currentDuration === 0;
    }

    get isPositive() {
        return this.type === EffectTypes.POSITIVE;
    }

    get isAttackEffect() {
        return this.phase === EffectPhase.ATTACK;
    }

    applyEffect(targetHero) {
        this.apply(targetHero);

        if (!this.isPersistent) {
            this.currentDuration = this.duration;
        }
    }

    removeEffect(targetHero) {
        this.remove(targetHero);
    }

    decreaseDuration() {
        this.currentDuration -= 1;
        this.events.emit('durationChanged');
    }
}
