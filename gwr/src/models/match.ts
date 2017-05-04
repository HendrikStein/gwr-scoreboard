import { MatchSet } from "./matchSet";
import { BaseGame } from "./baseGame";
import { Game } from "./game";
import { Pause } from "./pause";
import { Tiebreak } from "./tiebreak";

export class Match {

    private matchSets: Array<MatchSet>;
    private matchSet: MatchSet;
    private game: BaseGame;
    private pauseList: Array<Pause>;


    constructor(private player1: string, private player2: string, private service: string, private startDate: Date) {
        if (!startDate) {
            this.startDate = new Date();
        }
        this.matchSets = new Array<MatchSet>();
        this.matchSet = new MatchSet(player1, player2);
        this.game = new Game(player1, player2);
        this.pauseList = new Array<Pause>();
    }

    score(player: string) {
        this.game.score(player);
        if (this.game.isFinished()) {
            this.matchSet.score(player);
            if (this.game instanceof Tiebreak) {
                this.service = this.game.getStartService();
            }
            this.swapService();
            if (this.matchSet.isTiebreak()) {
                this.game = new Tiebreak(this.player1, this.player2, this.service);
            } else {
                this.game = new Game(this.player1, this.player2);
            }
        }

        if (this.matchSet.isTiebreak()) {
            this.checkServiceInTiebreak();
        }


        if (this.matchSet.isFinished()) {
            this.matchSets.push(this.matchSet);
            this.matchSet = new MatchSet(this.player1, this.player2);
            this.game = new Game(this.player1, this.player2);
        }
    }

    swapService() {
        this.service = this.service === this.player1 ? this.player2 : this.player1;
    }

    checkServiceInTiebreak() {
        let scoreSum = this.game.scoreCard[this.player1] + this.game.scoreCard[this.player2];
        if (scoreSum % 2 === 1 && !this.game.isFinished()) {
            this.swapService();
        }
    }

    pause(): Pause {
        let p = new Pause(this.matchSets, this.matchSet, null);
        this.pauseList.push(p);
        return p;
    }

    displayWonSets(player: string): number {
        let wonSets: number = 0;
        this.matchSets.forEach(function (playedSet) {
            if (playedSet.getWinner() === player) {
                wonSets++;
            }
        });
        return wonSets;
    }

    getPlayer1(): string {
        return this.player1;
    }

    setPlayer1(player1: string) {
        this.player1 = player1;
    }

    getPlayer2(): string {
        return this.player2;
    }

    setPlayer2(player2: string) {
        this.player2 = player2;
    }

    setCurrentGame(game: BaseGame) {
        this.game = game;
    }

    setCurrentMatchSet(currentSet: MatchSet) {
        this.matchSet = currentSet;
    }

    addMatchSet(matchSet: MatchSet) {
        this.matchSets.push(matchSet);
    }

    addPause(pause: Pause) {
        this.pauseList.push(pause);
    }
    displayScore() {
        console.clear();
        console.log("Current game: \n" + this.game.displayScore());
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
    getStartDate(): Date {
        return this.startDate;
    }

    getService(): string {
        return this.service;
    }

    setService(service: string) {
        this.service;
    }

    static fillFromJson(json: any) {
        let match = new Match(json.player1, json.player2, json.service, new Date(json.startDate));
        let currentGame: BaseGame;
        let currentMatchSet: MatchSet;

        if (json.matchSet.scoreCard[json.player1] === 6 && json.matchSet.scoreCard[json.player2] === 6) {
            currentGame = Tiebreak.fillFromJson(json.game);
        } else {
            currentGame = Game.fillFromJson(json.game);
        }
        match.setCurrentGame(currentGame);

        currentMatchSet = MatchSet.fillFromJson(json.matchSet);
        match.matchSet = currentMatchSet;

        json.matchSets.forEach(element => {
            match.addMatchSet(MatchSet.fillFromJson(element));
        });

        json.pauseList.forEach(element => {
            let currentMatchSetsPause = Match.fillMatchSetsFromJson(element.matchSets);
            let currentMatchSetPause = MatchSet.fillFromJson(element.matchSet);
            match.addPause(new Pause(currentMatchSetsPause, currentMatchSetPause, element.date));
        });
        return match;
    }
    private static fillMatchSetsFromJson(json: any): Array<MatchSet> {
        let matchSets = new Array<MatchSet>();
        json.forEach(element => {
            matchSets.push(MatchSet.fillFromJson(element));
        });
        return matchSets;
    }
}
