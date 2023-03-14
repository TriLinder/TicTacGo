import { GameBoardTile, Empty } from "./game_board_tile";

export class GameBoard {
    public board: GameBoardTile[][] = [];
    public readonly size: number;
    
    constructor(size: number) {
        this.size = size;

        this.reset();
    }

    public renderToCanvas(canvas: HTMLCanvasElement) {
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
        const pixelsPerTile = Math.floor(canvas.width / this.size);

        // Clear the canvas first
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                const tile = this.board[x][y];
                const tileCanvas = tile.render(pixelsPerTile);

                ctx.drawImage(tileCanvas, x * pixelsPerTile, y * pixelsPerTile);
            }
        }
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