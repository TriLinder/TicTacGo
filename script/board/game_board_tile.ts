import { TicTacGo } from "../main";

export const Empty = 0;
export const X = 1;
export const O = 2;

export class GameBoardTile {
    private ticTacGo: TicTacGo;
    
    public state: number;
    public isSelected: boolean;
    
    public geographicBounds: any;

    constructor(ticTacGo: TicTacGo, initalState: number) {
        this.ticTacGo = ticTacGo; 
        this.setState(initalState);
    }

    public render(pixelSize: number): HTMLCanvasElement {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        canvas.width = pixelSize;
        canvas.height = pixelSize;

        // Draw background if selected
        if (this.isSelected) {
            ctx.fillStyle = "#14fc69";
            ctx.globalAlpha = 0.5;

            ctx.fillRect(0, 0, pixelSize, pixelSize);
            
            ctx.globalAlpha = 1;
        }

        // Draw text
        ctx.fillStyle = "black";
        ctx.lineWidth = pixelSize / 25;
        ctx.font = `${pixelSize / 2}px sans-serif`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        ctx.fillText(this.getStateLetter(), pixelSize / 2, pixelSize / 2);

        // Draw border
        ctx.strokeRect(0, 0, pixelSize, pixelSize);

        return canvas;
    }

    public setGeographicBounds(northEast) {
        const mapboxgl: any = this.ticTacGo.mapboxManager.mapboxgl;

        const metersPerTile = this.ticTacGo.configManager.config["boardMeters"] / this.ticTacGo.configManager.config["boardTiles"];

        // See https://docs.mapbox.com/mapbox-gl-js/api/geography/
        this.geographicBounds = northEast.toBounds(metersPerTile);
        this.geographicBounds.setNorthEast(northEast);
    }

    public getStateLetter(): string {
        switch (this.state) {
            case Empty:
                return "-";
            case X:
                return "X";
            case O:
                return "O";
        }
    }

    public setState(state: number) {
        if (state == Empty || state == X || state == O) {
            this.state = state;
        }
        else {
            this.state = Empty;
        }
    }
}