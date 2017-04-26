import { BaseGame } from "./baseGame";

export class Game implements BaseGame {
    scoreCard: any = {};
    scoreRules: any = {
        0: '0',
        1: '15',
        2: '30',
        3: '40',
        4: 'Adv',
        5: 'Game'  
    };
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
            let secondPlayer = player === this.player1 ? this.player2 : this.player1;
            
            // Handle game
            if (this.scoreCard[player] === 3 && this.scoreCard[secondPlayer] < 3) {
                this.scoreCard[player] = 5;
                return; 
            }

            // Handle deuce
            if (this.scoreCard[this.player1] === 3 && this.scoreCard[this.player2] === 3) {
                this.scoreCard[player]++;
                return;
            }

            // Handle advantage
            if (this.scoreCard[secondPlayer] === 4) {
                this.scoreCard[player]++;
                this.scoreCard[secondPlayer]--;
                return;
            }

            if (this.scoreCard[player] === 4) {
                this.scoreCard[player]++;
                return;
            }

            // Simple score
            if (this.scoreCard[player] < 3) {
                this.scoreCard[player]++;
                return;
            }
        }
    }

    isFinished() {
        if (this.scoreCard[this.player1] === 5 || this.scoreCard[this.player2] === 5) {
            return true;
        }
        return false;
    }

    display(player:string) {
        return this.scoreRules[this.scoreCard[player]];
    }

    displayScore() {
        return this.getPlayerLabel(this.player1) + ": " + this.scoreRules[this.scoreCard[this.player1]] +
            "\n" + this.getPlayerLabel(this.player2) + ": " + this.scoreRules[this.scoreCard[this.player2]];    
    }

    getPlayerLabel(player:string) {
        return player === this.service ? "*" + player : player;
    }
}
