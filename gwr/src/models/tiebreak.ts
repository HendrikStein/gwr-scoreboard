import { BaseGame } from "./baseGame";

export class Tiebreak implements BaseGame {
    scoreCard: any = {};
    player1: string;
    player2: string;
    service: string;

    constructor(player1: string, player2: string, service: string) {
        this.player1 = player1;
        this.player2 = player2;
        this.scoreCard[player1] = 0;
        this.scoreCard[player2] = 0;
        this.service = service;
    }

    score(player: string) {
        if (!this.isFinished()) {
            this.scoreCard[player]++;
            let scoreSum = this.scoreCard[this.player1] + this.scoreCard[this.player2];
            if (scoreSum % 2 === 1 && !this.isFinished()) {
                this.swapService();
            }
        }
    }

    isFinished() {
        if ((this.scoreCard[this.player1] >=7 || this.scoreCard[this.player2] >=7) && Math.abs(this.scoreCard[this.player1] - this.scoreCard[this.player2])>=2) {
            return true;
        }
        return false;
    }

    swapService() {
        console.log("Tiebreak service swapped");
        this.service = this.service === this.player1 ? this.player2 : this.player1;    
    }

    display(player : string) {
        return this.scoreCard[player];
    }

    displayScore() {
        return this.getPlayerLabel(this.player1) + ": " + this.scoreCard[this.player1] +
            "\n" + this.getPlayerLabel(this.player2) + ": " + this.scoreCard[this.player2];    
    }

    getPlayerLabel(player: string) {
        return player === this.service ? "*" + player : player;
    }
    getService(): string {
        return this.service;
    }
}