import { MatchSet } from "./matchSet";
import { BaseGame } from "./baseGame";
import { Game } from "./game";
import { Pause } from "./pause";
import { Tiebreak } from "./tiebreak";

class Match {
    private player1: string;
    private player2: string;
    private matchSets: Array<MatchSet>;
    private matchSet: MatchSet;
    private game: BaseGame;
    private pauseList: Array<Pause>;
    private service: string;

    constructor(player1: string, player2:string, service:string) {
        this.player1 = player1;
        this.player2 = player2;
        this.matchSets = new Array<MatchSet>();
        this.matchSet = new MatchSet(player1, player2, service);
        this.game = new Game(player1, player2, service);  
        this.service = service;
        this.pauseList = new Array<Pause>();
    }

    score(player:string) {
        this.game.score(player);
        if (this.game.isFinished()) {
            this.matchSet.score(player);
            this.swapService();

            if (this.matchSet.isTiebreak()) {
                this.game = new Tiebreak(this.player1, this.player2, this.service);
            } else {
                this.game = new Game(this.player1, this.player2, this.service);
            }
        }

        if (this.matchSet.isFinished()) {
            this.matchSets.push(this.matchSet);
            this.matchSet = new MatchSet(this.player1, this.player2, this.service);
            this.game = new Game(this.player1, this.player2, this.service);
        }      
    }

    swapService() {
        this.matchSet.swapService();
        this.service = this.service === this.player1 ? this.player2 : this.player1;    
    }

    pause() {
        let p = new Pause(this.matchSets, this.matchSet);
        this.pauseList.push(p);
    }

    displayScore() {
        console.clear();
        console.log("Current game: \n"+ this.game.displayScore());
        console.log("Current set: \n" + this.matchSet.displayScore());
        console.log("Played Sets: \n");
        this.matchSets.forEach(function (playedSet) {
            console.log(playedSet.displayScore());
        });
        console.log("Pause: \n");
        this.pauseList.forEach(function (pauseEntry) {
            console.log(pauseEntry.display());
        });

    }
}
  