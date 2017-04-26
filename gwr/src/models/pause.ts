import { MatchSet } from "./matchSet";

export class Pause {
    private matchSets: Array<MatchSet>;
    private matchSet: MatchSet;
    private date: Date;

    constructor(matchSets: Array<MatchSet>, matchSet: MatchSet) {
        this.matchSet = matchSet.clone();
        this.matchSets = [...matchSets];
        this.date = new Date();
    }

    display() {
        console.log("Pause at: " + this.date.toLocaleDateString() + ", " + this.date.toLocaleTimeString() + "\n");
        console.log(this.matchSet.displayScore());
        
        this.matchSets.forEach(function (playedSet) {
            console.log(playedSet.displayScore());
        });
    }
}
