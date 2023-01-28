export class Game {
    radiantPlayer;
    direPlayer;
    events;
    round = 1;
    currentPlayer;
    gameEnded = false;

    constructor({ radiantPlayer, direPlayer, events }) {
        this.radiantPlayer = radiantPlayer;
        this.direPlayer = direPlayer;
        this.events = events;
        this.currentPlayer = radiantPlayer;
    }

    get enemyPlayer() {
        return this.currentPlayer === this.radiantPlayer ? this.direPlayer : this.radiantPlayer;
    }

    get enemyHero() {
        return this.enemyPlayer.hero;
    }

    get winner() {
        const deadHero = [this.radiantPlayer, this.direPlayer].find((player) => player.hero.isDead);

        if (!deadHero) return null;

        return deadHero === this.radiantPlayer ? this.direPlayer : this.radiantPlayer;
    }

    isCurrentHero(hero) {
        return this.currentPlayer.hero === hero;
    }

    isCurrentPlayer(player) {
        return this.currentPlayer === player;
    }

    moveToNextRound() {
        const isNextRound = this.currentPlayer === this.direPlayer;

        this.gameEnded = this.winner !== null;
        this.currentPlayer = this.enemyPlayer;

        this.events.emit('playerChanged', { currentPlayer: this.currentPlayer });

        if (isNextRound) {
            this.radiantPlayer.updateState();
            this.direPlayer.updateState();
            this.round += 1;
            this.events.emit('roundChanged', { currentPlayer: this.currentPlayer });
        }

        if (this.gameEnded) {
            this.events.emit('gameEnded', { winner: this.winner });
        }
    }

    async triggerSpell(spell) {
        await this.currentPlayer.useSpell(spell, this.enemyHero);
        this.moveToNextRound();
    }

    triggerAttack() {
        this.currentPlayer.attack(this.enemyHero);
        this.moveToNextRound();
    }
}
