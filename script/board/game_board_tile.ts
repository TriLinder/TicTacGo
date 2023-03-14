export const Empty = 0;
export const X = 1;
export const O = 2;

export class GameBoardTile {
    public state: number;
    
    constructor(initalState: number) {
        this.setState(initalState);
    }

    public render(pixelSize: number): HTMLCanvasElement {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        canvas.width = pixelSize;
        canvas.height = pixelSize;

        ctx.fillStyle = "black";
        ctx.lineWidth = pixelSize / 25;
        ctx.font = `${pixelSize / 2}px sans-serif`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        ctx.strokeRect(0, 0, pixelSize, pixelSize);
        ctx.fillText(this.getStateLetter(), pixelSize / 2, pixelSize / 2);

        return canvas;
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