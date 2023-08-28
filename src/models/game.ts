export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false; //Animation beim Kartenziehen wird inizialisiert am Start ist nicht gesetzt
    public currentCard: string = ''; //aktuelle Karte Variable wird definiert

    public player_images: string[] = []; //das Bild für jedes Spieler

    constructor() {
        /**alle 52 Karten werden hier erstellt */
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        shuffle(this.stack);
    }

    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            currentCard: this.currentCard,
            pickCardAnimation: this.pickCardAnimation,
            player_images: this.player_images
        }
    }

}

/**hier mit die Karten bzw. Kartenstack zusammen gemischt */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}