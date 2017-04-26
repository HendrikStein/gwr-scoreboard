export interface BaseGame {
    scoreCard: any;
    player1: string;
    player2: string;
    score(player: string): void;
    display(player: string): string;
    displayScore(): string;
    isFinished(): boolean;    
}
