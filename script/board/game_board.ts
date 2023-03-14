import { GameBoardTile, Empty } from "./game_board_tile";

export class GameBoard {
    public board: GameBoardTile[][] = [];
    public size: number;
    
    constructor(size: number) {
        this.size = size;

        this.reset();
    }

    public reset() {
        this.board = [];

        for (let x = 0; x < this.size; x++) {
            this.board[x] = [];

            for (let y = 0; y < this.size; y++) {
                this.board[x][y] = new GameBoardTile(Empty);
            }
        }
    }
}