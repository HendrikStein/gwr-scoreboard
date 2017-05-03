import { BaseGame } from "./baseGame";

export class Tiebreak implements BaseGame {
    scoreCard: any = {};
    player1: string;
    player2: string;
    startService: string;

    constructor(player1: string, player2: string, service: string) {
        this.player1 = player1;
        this.player2 = player2;
        this.scoreCard[player1] = 0;
        this.scoreCard[player2] = 0;
        this.startService = service;
    }

    score(player: string) {
        if (!this.isFinished()) {
            this.scoreCard[player]++;
        }
    }

    isSwapService(): boolean {
        let scoreSum = this.scoreCard[this.player1] + this.scoreCard[this.player2];
        if (scoreSum % 2 === 1 && !this.isFinished()) {
            return true;
        }
        return false;
    }

    isFinished() {
        if ((this.scoreCard[this.player1] >= 7 || this.scoreCard[this.player2] >= 7) && Math.abs(this.scoreCard[this.player1] - this.scoreCard[this.player2]) >= 2) {
            return true;
        }
        return false;
    }

    display(player: string) {
        return this.scoreCard[player];
    }

    displayScore() {
        return this.player1 + ": " + this.scoreCard[this.player1] +
            "\n" + this.player2 + ": " + this.scoreCard[this.player2];
    }

    getStartService(): string {
        return this.startService;
    }

    setScoreCard(sc: any) {
        this.scoreCard = sc;
    }
    static fillFromJson(json: any): Tiebreak {
        let tiebreak = new Tiebreak(json.player1, json.player2, json.startService);
        tiebreak.setScoreCard(json.scoreCard);
        return tiebreak;
    }
}