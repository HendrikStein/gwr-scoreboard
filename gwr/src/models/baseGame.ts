export interface BaseGame {
    scoreCard: any;
    player1: string;
    player2: string;
    score(player: string): void;
    getService(): string;
    display(player: string): string;
    displayScore(): string;
    isFinished(): boolean;
}
