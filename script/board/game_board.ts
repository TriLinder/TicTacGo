import { TicTacGo } from "../main";
import { GameBoardTile, Empty } from "./game_board_tile";

export class GameBoard {
    private ticTacGo: TicTacGo;
    
    public board: GameBoardTile[][] = [];
    public selectedTile: GameBoardTile | null;
    public readonly size: number;
    
    constructor(ticTacGo: TicTacGo, size: number) {
        this.ticTacGo = ticTacGo;
        this.size = size;

        this.reset();
    }

    public update() {
        // Update all tiles
        this.selectedTile = null;

        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                const tile = this.board[x][y];
                tile.update();
                
                if (tile.isSelected) {
                    this.selectedTile = tile;
                }
            }
        }
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
                this.board[x][y] = new GameBoardTile(this.ticTacGo, Empty);
            }
        }

        this.setGeographicBounds();
    }

    private setGeographicBounds() {
        // See https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatbounds

        // Fill out the north east tile
        const northEastTile = this.board[this.size - 1][0];
        northEastTile.setGeographicBounds(this.ticTacGo.mapboxManager.gameBoardBounds.getNorthEast());

        // Fill the top row from right to left
        for (let x = this.size - 2; x >= 0; x--) {
            const previousTile = this.board[x + 1][0];
            const currentTile = this.board[x][0];

            currentTile.setGeographicBounds(previousTile.geographicBounds.getNorthWest());
        }
        
        // Now fill the columns from top to bottom (and skip the top row)
        for (let x = 0; x < this.size; x++) {
            for (let y = 1; y < this.size; y++) {
                const previousTile = this.board[x][y - 1];
                const currentTile = this.board[x][y];

                currentTile.setGeographicBounds(previousTile.geographicBounds.getSouthEast());
            }
        }
    }
}