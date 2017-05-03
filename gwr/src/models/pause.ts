import { MatchSet } from "./matchSet";

export class Pause {

    constructor(private matchSets: Array<MatchSet>, private matchSet: MatchSet, private date: Date) {
        this.matchSet = matchSet.clone();
        this.matchSets = [...matchSets];
        if (!date) {
            this.date = new Date();
        }
    }

    getFormattedDateTime(): string {
        return this.date.toLocaleDateString() + ", " + this.date.toLocaleTimeString();
    }

    display() {
        console.log("Pause at: " + this.date.toLocaleDateString() + ", " + this.date.toLocaleTimeString() + "\n");
        console.log(this.matchSet.displayScore());

        this.matchSets.forEach(function (playedSet) {
            console.log(playedSet.displayScore());
        });
    }
}
