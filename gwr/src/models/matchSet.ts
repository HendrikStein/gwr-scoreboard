import { BaseGame } from "./baseGame";

export class MatchSet implements BaseGame {
    scoreCard: any = {};
    player1: string;
    player2: string;
    service: string;

    constructor(player1: string, player2: string) {
        this.player1 = player1;
        this.player2 = player2;
        this.scoreCard[player1] = 0;
        this.scoreCard[player2] = 0;
    }

    score(player: string) {
        if (!this.isFinished()) {
            this.scoreCard[player]++;
        }
    }

    isTiebreak() {
        return this.scoreCard[this.player1] === 6 && this.scoreCard[this.player2] === 6
    }

    isFinished() {
        // Handle Points > 6
        if ((this.scoreCard[this.player1] === 7 || this.scoreCard[this.player2] === 7)) {
            return true;
        }

        // Handle simple Set
        if ((this.scoreCard[this.player1] >= 6 || this.scoreCard[this.player2] >= 6) &&
            Math.abs(this.scoreCard[this.player1] - this.scoreCard[this.player2]) >= 2) {
            return true;
        }
        return false;
    }

    getWinner(): string {
        return this.scoreCard[this.player1] > this.scoreCard[this.player2] ? this.player1 : this.player2;
    }


    display(player: string) {
        return this.scoreCard[player];
    }

    displayScore() {
        return this.player1 + ": " + this.scoreCard[this.player1] +
            "\n" + this.player2 + ": " + this.scoreCard[this.player2];
    }


    clone() {
        let c = new MatchSet(this.player1, this.player2);
        c.scoreCard = Object.assign({}, this.scoreCard);
        return c;
    }
}